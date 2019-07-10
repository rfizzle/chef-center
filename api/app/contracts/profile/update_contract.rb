# frozen_string_literal: true

# User show contract
class Profile::UpdateContract < Dry::Validation::Contract
  params do
    required(:name).filled(:str?)
  end
end
