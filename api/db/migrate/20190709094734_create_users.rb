# frozen_string_literal: true

# Create user table
class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :salt
      t.string :kdf_salt
      t.string :verifier
      t.boolean :mfa_enabled
      t.string :otp_secret
      t.integer :last_otp_at
      t.string :pbkdf2_salt
      t.string :aes_iv
      t.string :public_key
      t.string :encrypted_private_key
      t.text :proof

      t.timestamps
    end
  end
end
