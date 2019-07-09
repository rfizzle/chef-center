# frozen_string_literal: true

# Operation schema for validation
class OperationSchema < Dry::Validation::Contract
  params do
    required(:transaction)
    required(:contract)
    required(:decorator)
    required(:input)
  end

  rule(:transaction) do
    key.failure('is not a transaction class.') unless value.ancestors.include?(Transaction)
  end

  rule(:contract) do
    key.failure('is not a contract class.') unless value.ancestors.include?(Dry::Validation::Contract)
  end

  rule(:input) do
    key.failure('is not a hash.') unless value.is_a?(Hash)
  end
end
