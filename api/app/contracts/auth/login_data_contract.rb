# frozen_string_literal: true

# User challenge contract
class Auth::LoginDataContract < Dry::Validation::Contract
  params do
    required(:email).filled(:str?)
  end
end
