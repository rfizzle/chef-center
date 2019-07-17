# frozen_string_literal: true

# Role show operation
class Role::Show < Transaction
  CONTRACT = Role::ShowContract
  DECORATOR = Role::ShowDecorator

  step :find_role

  def find_role(input)
    # Use the chef HTTP client to get a list of role
    raw_role = Rails.application.config.chef_client.get("/roles/#{input[:params][:id]}")

    # Build then role
    role = RoleParser.parse(raw_role)

    # Set the role as the models
    ctx[:model] = role

    # Return success
    Success(role)
  end
end
