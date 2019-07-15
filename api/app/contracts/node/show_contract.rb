# frozen_string_literal: true

# Node show contract
class Node::ShowContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
  end
end
