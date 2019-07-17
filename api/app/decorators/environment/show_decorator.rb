# frozen_string_literal: true

# Environment show decorator
class Environment::ShowDecorator < ApplicationDecorator
  property :id
  property :name
  property :description
  property :default_attributes
  property :override_attributes
  property :cookbook_versions
end
