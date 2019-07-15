# frozen_string_literal: true

# Environment index operation
class Environment::Index < Transaction
  DECORATOR = Environment::IndexDecorator

  step :find_environments

  def find_environments(_input)
    # Use the chef HTTP client to get a list of environments
    raw_environments = Rails.application.config.chef_client.get('/environments')

    # Build an empty array
    environments = []

    raw_environments.each do |key, _value|
      environments << key
    end

    # Set the environments as the models
    ctx[:model] = { environments: environments }

    # Return success
    Success(ctx[:model])
  end
end
