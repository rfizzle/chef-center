# frozen_string_literal: true

# Node show contract
class Node::UpdateContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
    required(:node).schema do
      optional(:chef_environment).filled(:str?)
      optional(:run_list).each(:str?)
      optional(:override_attributes).value(:hash?)
      optional(:normal_attributes).value(:hash?)
      optional(:default_attributes).value(:hash?)
    end
  end
end
