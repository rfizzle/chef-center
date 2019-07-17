# frozen_string_literal: true

# Role show contract
class Role::ShowContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
  end
end
