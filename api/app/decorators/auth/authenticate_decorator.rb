# frozen_string_literal: true

# Auth authenticate decorator
class Auth::AuthenticateDecorator < ApplicationDecorator
  property :jwt
  property :H_AMK
  property :aes_iv
  property :encrypted_private_key
  property :name
  property :pbkdf2_salt
  property :public_key
  property :refresh_token
  property :csrf_token
end
