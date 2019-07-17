# frozen_string_literal: true

# Node show contract
class Node::UpdateContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
    required(:node).schema do
      optional(:chef_environment).filled(:str?)
      optional(:run_list).each(:hash?)
      optional(:override).value(:hash?)
      optional(:normal).value(:hash?)
      optional(:default).value(:hash?)
    end
  end
end
