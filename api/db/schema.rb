# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_190_709_094_734) do
  create_table 'users', force: :cascade do |t|
    t.string 'name'
    t.string 'email'
    t.string 'salt'
    t.string 'kdf_salt'
    t.string 'verifier'
    t.boolean 'mfa_enabled'
    t.string 'otp_secret'
    t.integer 'last_otp_at'
    t.string 'pbkdf2_salt'
    t.string 'aes_iv'
    t.string 'public_key'
    t.string 'encrypted_private_key'
    t.text 'proof'
    t.string 'refresh_token'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end
end
