# frozen_string_literal: true

# User index operation
class Node::Index < Transaction
  DECORATOR = Node::IndexDecorator

  step :find_nodes

  def find_nodes(_input)
    # Use the chef HTTP client to get a list of node
    raw_nodes = Rails.application.config.chef_client.get('/search/node')

    # Build an empty array
    nodes = []

    # Loop through the node and get the valuable data
    raw_nodes['rows'].each do |node|
      # Only add node
      if node['chef_type'] == 'node'
        nodes << {
          id: node['name'],
          environment: node['environment'],
          run_list: node['run_list'],
          hostname: node['automatic']['hostname'],
          machine_id: node['automatic']['machine_id'],
          machine_name: node['automatic']['machinename'],
          fqdn: node['automatic']['fqdn'],
          uptime: node['automatic']['uptime_seconds'],
          last_checkin: node['automatic']['ohai_time'],
          os: node['automatic']['os'],
          os_version: node['automatic']['os_version'],
          platform: node['automatic']['platform'],
          platform_family: node['automatic']['platform_family'],
          platform_version: node['automatic']['platform_version'],
          recipes: node['automatic']['recipes'],
          roles: node['automatic']['roles'],
        }
      end
    end

    # Set the node as the models
    ctx[:model] = nodes

    # Return success
    Success(nodes)
  end
end
