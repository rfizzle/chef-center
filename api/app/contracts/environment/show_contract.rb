# frozen_string_literal: true

# Environment show contract
class Environment::ShowContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
  end
end
