class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true
  validates :salt, presence: true
  validates :kdf_salt, presence: true
  validates :verifier, presence: true
  validates :pbkdf2_salt, presence: true
  validates :aes_iv, presence: true
  validates :public_key, presence: true
  validates :encrypted_private_key, presence: true
end
