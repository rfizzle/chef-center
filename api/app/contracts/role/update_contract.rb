# frozen_string_literal: true

# Role update contract
class Role::UpdateContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
    required(:role).schema do
      optional(:description).filled(:str?)
      optional(:run_list).each(:str?)
      optional(:env_run_lists).each(:hash?)
      optional(:override_attributes).value(:hash?)
      optional(:default_attributes).value(:hash?)
    end
  end
end
