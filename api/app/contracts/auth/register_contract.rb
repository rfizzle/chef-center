# frozen_string_literal: true

# User registration contract
class Auth::RegisterContract < Dry::Validation::Contract
  params do
    required(:email).filled(:str?)
    required(:name).filled(:str?)
    required(:kdf_salt).filled(:str?)
    required(:salt).filled(:str?)
    required(:verifier).filled(:str?)
    required(:pbkdf2_salt).filled(:str?)
    required(:aes_iv).filled(:str?)
    required(:public_key).filled(:str?)
    required(:encrypted_private_key).filled(:str?)
    optional(:mfa_secret).filled(:str?)
    optional(:mfa_otp).filled(:str?)
  end
end
