# frozen_string_literal: true

# User index operation
class Dashboard::Index < Transaction
  DECORATOR = Dashboard::IndexDecorator

  step :build_model
  step :get_node_count
  step :get_cookbook_count
  step :get_roles_count
  step :get_clients_count

  def build_model(_input)
    ctx[:model] = {
      nodes: 0,
      cookbooks: 0,
      roles: 0,
      clients: 0,
    }
    Success(ctx[:model])
  end

  def get_node_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_nodes = Rails.application.config.chef_client.get('/nodes')

    ctx[:model][:nodes] = raw_nodes.count

    # Return success
    Success(ctx[:model])
  end

  def get_cookbook_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_cookbooks = Rails.application.config.chef_client.get('/cookbooks')

    ctx[:model][:cookbooks] = raw_cookbooks.count

    # Return success
    Success(ctx[:model])
  end

  def get_roles_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_roles = Rails.application.config.chef_client.get('/roles')

    ctx[:model][:roles] = raw_roles.count

    # Return success
    Success(ctx[:model])
  end

  def get_clients_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_clients = Rails.application.config.chef_client.get('/clients')

    ctx[:model][:clients] = raw_clients.count

    # Return success
    Success(ctx[:model])
  end
end
