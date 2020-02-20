# frozen_string_literal: true

# Client index operation
class Client::Index < Transaction
  DECORATOR = Client::IndexDecorator

  step :find_clients

  def find_clients(_input)
    # Use the chef HTTP client to get a list of clients
    raw_clients_list = Rails.application.config.chef_client.get('/clients')

    # Build an empty array
    clients = []

    raw_clients_list.each do |id, _|
      clients << { id: id }
    end

    # Set the client list as the model
    ctx[:model] = clients

    # Return success
    Success(clients)
  end
end
