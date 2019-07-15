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
        nodes << NodeParser.parse(node)
      end
    end

    # Set the node as the models
    ctx[:model] = nodes

    # Return success
    Success(nodes)
  end
end
