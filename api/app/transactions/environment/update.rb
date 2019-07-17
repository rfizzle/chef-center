# frozen_string_literal: true

# Environment show operation
class Environment::Update < Transaction
  CONTRACT = Environment::UpdateContract
  DECORATOR = Environment::ShowDecorator

  step :find_environment
  step :update_environment
  step :save_environment

  def find_environment(input)
    # Use the chef HTTP client to get a list of environment
    raw_environment = Rails.application.config.chef_client.get("/environments/#{input[:params][:id]}")

    # Build then environment
    environment = EnvironmentParser.parse_for_update(raw_environment)

    # Set the environment as the models
    input[:environment] = environment

    # Return success
    Success(input)
  end

  # Support patch
  def update_environment(input)
    if input.dig(:params, :environment, :description)
      input[:environment][:description] = input.dig(:params, :environment, :description)
    end

    if input.dig(:params, :environment, :default_attributes)
      input[:environment][:default_attributes] = input.dig(:params, :environment, :default_attributes)
    end

    if input.dig(:params, :environment, :override_attributes)
      input[:environment][:override_attributes] = input.dig(:params, :environment, :override_attributes)
    end

    if input.dig(:params, :environment, :cookbook_versions)
      input[:environment][:cookbook_versions] = input.dig(:params, :environment, :cookbook_versions)
    end

    # Return success
    Success(input)
  end

  def save_environment(input)
    raw_environment = Rails.application.config.chef_client.put("/environments/#{input[:params][:id]}", input[:environment])

    ctx[:model] = EnvironmentParser.parse(raw_environment)

    Success(input)
  end
end
