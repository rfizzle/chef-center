/* eslint new-cap: ["error", {"newIsCapExceptions": ["jsrp.client"]}] */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

import scrypt from 'scrypt-async';
import jsrp from 'jsrp';
import randomBytes from 'randombytes';
import { apiGet, apiPost } from '../utils/ApiUtils';
import AppCrypto from './AppCrypto';

// Default scrypt parameters
const SCRYPT_PARAMETERS = {
  N: 16384, // about 100ms
  r: 8,
  p: 1,
  dkLen: 16,
  encoding: 'binary',
};
const SALT_LENGTH = 32;
const SRP_KEY_LENGTH = 4096;

/**
 * Class for communicating with the SRP authentication server
 */
class Authenticator {
  /**
   * Creates Authenticator object
   * @param {Number} [keyLength=SRP_KEY_LENGTH] - SRP key length
   */
  constructor(keyLength = SRP_KEY_LENGTH) {
    this.keyLength = keyLength;
    this.srp = null;
  }

  /**
   * Check if user is authenticated
   * @returns {Promise<Object>}
   */
  static checkAuth() {
    return apiGet('/authentication/check');
  }

  /**
   * Sends a logout request to the server
   * @returns {Promise<Object>}
   */
  static logout() {
    AppCrypto.clearDataStore();
    return apiPost('/authentication/logout', {});
  }

  /**
   * Registers the user
   * @param {String} name
   * @param {String} email
   * @param {String} password
   * @param {String} mfaSecret
   * @param {String} mfaOtp
   * @return {Promise.<Object>}
   */
  async register(name, email, password, mfaSecret = '', mfaOtp = '') {
    // Generate KDF Salt
    const kdfSalt = Authenticator._generateSalt().toString('hex');

    // Generate key from scrypt of password and kdfSalt
    const key = await Authenticator._scrypt(password, kdfSalt);

    // Setup SRP
    await this._srpSetup(email, key);

    // Generate salt and verifier
    const { salt, verifier } = await this._srpRegister();

    // Generate PBKDF2 salt
    const pbkdf2Salt = AppCrypto.generatePbkdf2Salt();

    // Generate AES IV
    const aesIv = AppCrypto.generateAesIv();

    // Generate PBKDF2 key from password, salt, and aesIv
    const pbkdf2Key = await AppCrypto.deriveAesKeyFromPassword(password, pbkdf2Salt);

    // Generate RSA key
    const rsaKey = await AppCrypto.generateRsaKey();

    // Export public and private keys and turn them into strings
    const rsaPublicKey = await AppCrypto.exportRsaPublicKey(rsaKey.publicKey);
    const rsaPublicKeyString = JSON.stringify(rsaPublicKey);
    const rsaPrivateKey = await AppCrypto.exportRsaPrivateKey(rsaKey.privateKey);
    const rsaPrivateKeyString = JSON.stringify(rsaPrivateKey);

    // Encrypt private key
    const encryptedPrivateKey = await AppCrypto.aesEncrypt(pbkdf2Key, aesIv, rsaPrivateKeyString);

    return await apiPost(
      '/authentication/register',
      {
        name,
        email,
        kdf_salt: kdfSalt,
        salt,
        verifier,
        pbkdf2_salt: pbkdf2Salt,
        aes_iv: aesIv,
        public_key: rsaPublicKeyString,
        encrypted_private_key: encryptedPrivateKey,
        ...(mfaSecret && { mfa_secret: mfaSecret, mfa_otp: mfaOtp })
      }
    );
  }

  /**
   * Logs in the user
   * @param {String} email
   * @param {String} password
   * @param {String} otp
   * @return {Promise.<Object>}
   * @throws {Error}
   */
  async login(email, password, otp) {
    // Post login data and get response with kdf salt (for scrypt)
    const loginDataResponse = await apiPost('/authentication/login-data', { email });

    // Get kdf salt from login data response
    const kdfSalt = loginDataResponse.kdf_salt;

    // Generate scrypt key from password and salt
    const key = await Authenticator._scrypt(password, kdfSalt);

    // Setup SRP
    await this._srpSetup(email, key);

    // Get client public key (A) for challenge
    const A = this._srpChallenge();

    // Post challenge and get server public key (B) and SHA256 salt for SRP hashing
    const challengeResponse = await apiPost('/authentication/challenge', { email, A });

    const { B, salt } = challengeResponse;

    // Generate client proof (M) from the salt and the server public key (B)
    const M = this._srpAuthenticate(salt, B);

    // Post authenticate and get the shared secret (H_AMK) and user's name
    const authResponse = await apiPost('/authentication/authenticate', { email, M, ...(otp && { otp }) });

    // Get shared secret (H_AMK) and user's name from auth response
    const { H_AMK, name, pbkdf2_salt, aes_iv, encrypted_private_key } = authResponse;

    // Return resolve promise if shared secret is correct
    if (this._srpCheckServer(H_AMK)) {
      // Derive AES key from password
      const aesKey = await AppCrypto.deriveAesKeyFromPassword(password, pbkdf2_salt);

      // Decrypt private key and parse it into a JWK object
      const privateKeyString = await AppCrypto.aesDecrypt(aesKey, aes_iv, encrypted_private_key);
      const privateKeyJWK = JSON.parse(privateKeyString);

      // Import the private key JWK to create a CryptoKey
      const privateKey = await AppCrypto.importRsaPrivateKey(privateKeyJWK);

      // Store the key in the data store
      AppCrypto.putKey('private_key', privateKey);

      // Return promise with email and name
      return Promise.resolve({ email, name });
    }

    // **This should never happen**
    // TODO: If this happens, we should be alerted to it at once. Add error service to push to
    throw new Error('Invalid Shared Secret for RSP-6a');
  }

  /**
   * Generates random salt
   * @return {Uint8Array} - generated salt
   * @private
   */
  static _generateSalt() {
    return randomBytes(SALT_LENGTH);
  }

  /**
   * Password strengthening function.
   * @param {String} password
   * @param {String} salt
   * @return {Promise.<Uint8Array>} - derived key.
   * @private
   */
  static async _scrypt(password, salt) {
    return new Promise(resolve => scrypt(password, salt, SCRYPT_PARAMETERS, resolve));
  }

  /**
   * Setup SRP with an email and salt.
   * @private
   */
  _srpSetup(email, key) {
    const parameters = {
      username: email,
      password: key,
      length: this.keyLength,
    };
    this.srp = new jsrp.client();
    return new Promise(resolve => this.srp.init(parameters, resolve));
  }

  /**
   * Creates SRP verifier and salt from derived key
   * @return {Promise.<{verifier, salt}>} - SRP verifier object
   * @private
   */
  async _srpRegister() {
    return new Promise((resolve, reject) =>
      this.srp.createVerifier(
        (err, result) => (err ? reject(err) : resolve(result)),
      ));
  }

  /**
   * Gets public key from SRP client
   * @returns {Promise<{A: String}>} - SRP client public key
   * @private
   */
  _srpChallenge() {
    if (this.srp === null) {
      throw new Error('srpSetup needs to be called first');
    }
    return this.srp.getPublicKey();
  }

  /**
   * Generates client proof from salt and server public key
   * @param {String} salt
   * @param {String} B - server public key
   * @return {Promise.<{M: String}>} - SRP client proof
   * @private
   */
  _srpAuthenticate(salt, B) {
    if (this.srp === null) {
      throw new Error('srpSetup needs to be called first');
    }
    this.srp.setSalt(salt);
    this.srp.setServerPublicKey(B);
    return this.srp.getProof();
  }

  /**
   * Checks server proof
   * @param {String} H_AMK - server proof
   * @return {Promise.<{Boolean}>} if proof is OK
   * @private
   */
  _srpCheckServer(H_AMK) {
    if (this.srp === null) {
      throw new Error('srpLogin needs to be called first');
    }
    return this.srp.checkServerProof(H_AMK);
  }
}

export default Authenticator;