# frozen_string_literal: true

# Environment update contract
class Environment::UpdateContract < Dry::Validation::Contract
  params do
    required(:id).filled(:str?)
    required(:environment).schema do
      optional(:description).filled(:str?)
      optional(:cookbook_versions).each(:hash?)
      optional(:override_attributes).value(:hash?)
      optional(:default_attributes).value(:hash?)
    end
  end
end
