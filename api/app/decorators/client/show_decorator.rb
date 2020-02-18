# frozen_string_literal: true

# Environment show decorator
class Client::ShowDecorator < ApplicationDecorator
  property :admin
  property :chef_type
  property :json_class
  property :name
  property :public_key
  property :validator
end
