# frozen_string_literal: true

# Node show operation
class Node::Show < Transaction
  CONTRACT = Node::ShowContract
  DECORATOR = Node::ShowDecorator

  step :find_node

  def find_node(input)
    # Use the chef HTTP client to get a list of node
    raw_node = Rails.application.config.chef_client.get("/nodes/#{input[:params][:id]}")

    # Build then node
    node = NodeParser.parse(raw_node)

    # Set the node as the models
    ctx[:model] = node

    # Return success
    Success(node)
  end
end
