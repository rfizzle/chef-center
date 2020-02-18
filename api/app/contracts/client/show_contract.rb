# frozen_string_literal: true

# Client show contract
class Client::ShowContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
  end
end
