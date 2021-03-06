# frozen_string_literal: true

# Node show operation
class Node::Update < Transaction
  CONTRACT = Node::UpdateContract
  DECORATOR = Node::ShowDecorator

  step :find_node
  step :update_node
  step :save_node

  def find_node(input)
    # Use the chef HTTP client to get a list of node
    raw_node = Rails.application.config.chef_client.get("/nodes/#{input[:params][:id]}")

    # Build then node
    node = NodeParser.parse_for_update(raw_node)

    # Set the node as the models
    input[:node] = node

    # Return success
    Success(input)
  end

  # Support patch
  def update_node(input)
    if input.dig(:params, :node, :chef_environment)
      input[:node][:chef_environment] = input.dig(:params, :node, :chef_environment)
    end

    input[:node][:run_list] = input.dig(:params, :node, :run_list) if input.dig(:params, :node, :run_list)

    if input.dig(:params, :node, :override_attributes)
      input[:node][:override] = input.dig(:params, :node, :override_attributes)
    end

    if input.dig(:params, :node, :normal_attributes)
      input[:node][:normal] = input.dig(:params, :node, :normal_attributes)
    end

    if input.dig(:params, :node, :default_attributes)
      input[:node][:default] = input.dig(:params, :node, :default_attributes)
    end

    # Return success
    Success(input)
  end

  def save_node(input)
    raw_node = Rails.application.config.chef_client.put("/nodes/#{input[:params][:id]}", input[:node])

    node = NodeParser.parse(raw_node)

    ctx[:model] = node

    Success(input)
  end
end
