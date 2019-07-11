# frozen_string_literal: true

# User index operation
class Cookbook::Index < Transaction
  DECORATOR = Cookbook::IndexDecorator

  step :find_cookbooks

  def find_cookbooks(_input)
    # Use the chef HTTP client to get a list of node
    raw_cookbooks_list = Rails.application.config.chef_client.get('/cookbooks')

    # Build an empty array
    cookbooks = []

    raw_cookbooks_list.each do |name, params|
      book_version = params['versions'][0]['version']
      cookbooks << { name: name, version: book_version }
      # Rails.application.config.chef_client.get("/cookbooks/#{name}/#{version}")
    end

    # Set the node as the models
    ctx[:model] = cookbooks

    # Return success
    Success(cookbooks)
  end
end
