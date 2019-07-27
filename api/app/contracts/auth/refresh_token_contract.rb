# frozen_string_literal: true

# User refresh token contract
class Auth::RefreshTokenContract < Dry::Validation::Contract
  params do
    required(:refresh_token).filled(:str?)
  end
end
