# frozen_string_literal: true

# User challenge contract
class Auth::ChallengeContract < Dry::Validation::Contract
  params do
    required(:email).filled(:str?)
    required(:A).filled(:str?)
  end
end
