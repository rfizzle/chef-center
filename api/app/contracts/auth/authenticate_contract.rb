# frozen_string_literal: true

# User challenge contract
class Auth::AuthenticateContract < Dry::Validation::Contract
  params do
    required(:email).filled(:str?)
    required(:M).filled(:str?)
    optional(:otp).filled(:str?)
  end
end
