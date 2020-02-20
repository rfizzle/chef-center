# frozen_string_literal: true

# Client show operation
class Client::Show < Transaction
  CONTRACT = Client::ShowContract
  DECORATOR = Client::ShowDecorator

  step :find_client

  def find_client(input)
    # Use the chef HTTP client to get a list of node
    raw_client = Rails.application.config.chef_client.get("/clients/#{input[:params][:id]}")

    # Set the client as the model
    ctx[:model] = raw_client

    # Return success
    Success(raw_client)
  end
end
