# frozen_string_literal: true

# Environment show operation
class Environment::Show < Transaction
  CONTRACT = Environment::ShowContract
  DECORATOR = Environment::ShowDecorator

  step :find_environment

  def find_environment(input)
    # Use the chef HTTP client to get an environment
    raw_environment = Rails.application.config.chef_client.get("/environments/#{input[:params][:id]}")

    # Build the environment
    environment = EnvironmentParser.parse(raw_environment)

    # Set the environment as the models
    ctx[:model] = environment

    # Return success
    Success(environment)
  end
end
