# frozen_string_literal: true

# Cookbook show contract
class Cookbook::ShowContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
  end
end
