# frozen_string_literal: true

# Role index operation
class Role::Index < Transaction
  DECORATOR = Role::IndexDecorator

  step :find_roles

  def find_roles(_input)
    # Use the chef HTTP client to get a list of node
    raw_roles = Rails.application.config.chef_client.get('/search/role')

    # Build an empty array
    roles = []

    raw_roles['rows'].each do |role|
      roles << {
        name: role['name'],
        description: role['description'],
        run_list: role['run_list'],
        default_attributes: role['default_attributes']
      }
    end

    # Set the node as the models
    ctx[:model] = roles

    # Return success
    Success(roles)
  end
end
