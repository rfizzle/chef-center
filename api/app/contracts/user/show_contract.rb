# frozen_string_literal: true

# User show contract
class User::ShowContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
  end
end
