import settings from '../settings';
import { Base64 } from 'js-base64';

/**
 * Main class for application wide crypto. Handles generating keys, deriving keys from
 * password, and storing them in the local indexedDB.
 */
const crypto = window.crypto || window.msCrypto || window.webkitCrypto || window.mozCrypto;

class AppCrypto {
  static generatePbkdf2Salt() {
    return Base64.encode(
      AppCrypto._arrayBufferToString(
        crypto.getRandomValues(new Uint8Array(16)).buffer
      )
    );
  }

  /**
   * Generate new random AES key.
   * @returns {Promise<CryptoKey>}
   */
  static async generateAesKey() {
    return await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
    );
  }

  /**
   * Generate new random AES IV.
   * @returns {string}
   */
  static generateAesIv() {
    return Base64.encode(
      AppCrypto._arrayBufferToString(
        crypto.getRandomValues(new Uint8Array(12)).buffer
      )
    );
  }

  /**
   * Generate new random RSA key.
   * @returns {Promise<CryptoKeyPair>}
   */
  static async generateRsaKey() {
    return await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-512' },
      },
      true,
      ['wrapKey', 'unwrapKey'],
    );
  }

  /**
   * Import an RSA public key. These are used to wrap AES keys for other users.
   * @param {Object} publicKey - the public key in JWK format.
   * @returns {Promise<CryptoKey>}
   */
  static async importRsaPublicKey(publicKey) {
    return await crypto.subtle.importKey(
      'jwk',
      publicKey,
      {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-512' },
      },
      false,
      ['wrapKey'],
    );
  }

  /**
   * Export an RSA public key.
   * @param {CryptoKey} publicKey
   * @returns {Promise<JsonWebKey>}
   */
  static async exportRsaPublicKey(publicKey) {
    return await crypto.subtle.exportKey(
      'jwk',
      publicKey
    );
  }

  /**
   * Export an RSA private key.
   * @param {CryptoKey} privateKey
   * @returns {Promise<JsonWebKey>}
   */
  static async exportRsaPrivateKey(privateKey) {
    return await crypto.subtle.exportKey(
      'jwk',
      privateKey
    );
  }

  /**
   * Import an RSA private key. These are used to unwrap this user's AES keys.
   * @param {Object} privateKey - the private key in JWK format.
   * @returns {Promise<CryptoKey>}
   */
  static async importRsaPrivateKey(privateKey) {
    return await crypto.subtle.importKey(
      'jwk',
      privateKey,
      {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-512' },
      },
      false,
      ['unwrapKey'],
    );
  }

  /**
   * Derives an AES key from the user's password.
   * @param {string} password - the user's raw password.
   * @param {string} salt - the user's salt for the aes key (base64 encoded).
   * @returns {CryptoKey}
   */
  static async deriveAesKeyFromPassword(password, salt) {
    // Convert password into a PBKDF2
    const pbkdfKey = await crypto.subtle.importKey(
      'raw',
      AppCrypto._stringToArrayBuffer(password),
      { name: 'PBKDF2' }, // Algorithm
      false, // whether the key is extractable (i.e. can be used in exportKey)
      ['deriveKey', 'deriveBits']
    );

    // Convert PBKDF2 and salt into an AES key
    return await crypto.subtle.deriveKey(
      {
        'name': 'PBKDF2',
        salt: AppCrypto._stringToArrayBuffer(Base64.decode(salt)),
        iterations: 1000,
        hash: { name: 'SHA-512' }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      pbkdfKey,
      {
        name: 'AES-GCM',
        length: 256,
      },
      false, // whether the derived key is extractable (i.e. can be used in exportKey)
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Symmetric encryption process.
   * @param {CryptoKey} key - AES encryption key.
   * @param {string} iv - IV for encryption (base64 encoded).
   * @param {string} data - the string to be encrypted.
   * @returns {Promise<string>} the encrypted string.
   */
  static async aesEncrypt(key, iv, data) {
    return Base64.encode(
      AppCrypto._arrayBufferToString(
        await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv: AppCrypto._stringToArrayBuffer(Base64.decode(iv)) },
          key,
          AppCrypto._stringToArrayBuffer(data)
        )
      )
    );
  }

  /**
   * Symmetric decryption process.
   * @param {CryptoKey} key - AES encryption key.
   * @param {string} iv - IV for decryption (base64 encoded).
   * @param {string} data - the encrypted string to be decrypted (base64 encoded).
   * @returns {Promise<string>} the decrypted string.
   */
  static async aesDecrypt(key, iv, data) {
    return AppCrypto._arrayBufferToString(
      await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: AppCrypto._stringToArrayBuffer(Base64.decode(iv)) },
        key,
        AppCrypto._stringToArrayBuffer(Base64.decode(data))
      )
    );
  }

  /**
   * Get key from data store.
   * @param {string} id - the ID of the key.
   * @returns {CryptoKey} the crypto key
   */
  static getKey(id) {
    let key;
    AppCrypto._callOnStore(function (store) {
      key = store.get(id);
    });
    // noinspection JSUnusedAssignment
    return key;
  }

  /**
   * Put key into data store.
   * @param {string} id - the ID of the key.
   * @param {CryptoKey} key - the crypto key.
   */
  static putKey(id, key) {
    AppCrypto._callOnStore(function (store) {
      store.put({ id: id, key: key });
    });
  }

  /**
   * Delete all keys in the data store.
   */
  static clearDataStore() {
    AppCrypto._callOnStore(function (store) {
      store.clear();
    });
  }

  /**
   * Store initialization function to be used with a callback block.
   * @param {function} fn_ - the callback function with the store initialized
   * @private
   */
  static _callOnStore(fn_) {
    // setup store name
    const storeName = settings.appName + 'Store';

    // This works on all devices/browsers
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    // Open (or create) the database
    const open = indexedDB.open(storeName, 1);

    // Create the schema
    open.onupgradeneeded = function () {
      const db = open.result;
      db.createObjectStore(storeName, { keyPath: 'id' });
    };

    // Set onSuccess function
    open.onsuccess = function () {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);

      fn_(store);


      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  /**
   * Convert string to array buffer
   * @param {string} byteString
   * @returns {Uint8Array} the buffer array of the submitted string
   */
  static _stringToArrayBuffer(byteString) {
    let byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.codePointAt(i);
    }
    return byteArray;
  }

  /**
   * Convert array buffer to string
   * @param {ArrayBuffer} buf
   * @returns {string} the string value of the buffer
   */
  static _arrayBufferToString(buf) {
    let byteArray = new Uint8Array(buf);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
  }

}

export default AppCrypto;