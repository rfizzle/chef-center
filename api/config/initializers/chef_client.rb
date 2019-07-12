# frozen_string_literal: true

# Initialize the chef client

Rails.application.config.chef_client = Chef::ServerAPI.new(
  ENV['CHEF_SERVER_URL'],
  raw_key: Base64.decode64(ENV['CHEF_CLIENT_KEY']),
  client_name: ENV['CHEF_CLIENT_NAME']
)
