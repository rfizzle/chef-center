# frozen_string_literal: true

# Role show operation
class Role::Update < Transaction
  CONTRACT = Role::UpdateContract
  DECORATOR = Role::ShowDecorator

  step :find_role
  step :update_role
  step :save_role

  def find_role(input)
    # Use the chef HTTP client to get a list of role
    raw_role = Rails.application.config.chef_client.get("/roles/#{input[:params][:id]}")

    # Build then role
    role = RoleParser.parse_for_update(raw_role)

    # Set the role as the models
    input[:role] = role

    # Return success
    Success(input)
  end

  # Support patch
  def update_role(input)
    input[:role][:description] = input.dig(:params, :role, :description) if input.dig(:params, :role, :description)

    input[:role][:run_list] = input.dig(:params, :role, :run_list) if input.dig(:params, :role, :run_list)

    if input.dig(:params, :role, :env_run_lists)
      input[:role][:env_run_lists] = input.dig(:params, :role, :env_run_lists)
    end

    if input.dig(:params, :role, :default_attributes)
      input[:role][:default_attributes] = input.dig(:params, :role, :default_attributes)
    end

    if input.dig(:params, :role, :override_attributes)
      input[:role][:override_attributes] = input.dig(:params, :role, :override_attributes)
    end

    # Return success
    Success(input)
  end

  def save_role(input)
    raw_role = Rails.application.config.chef_client.put("/roles/#{input[:params][:id]}", input[:role])

    ctx[:model] = RoleParser.parse(raw_role)

    Success(input)
  end
end
