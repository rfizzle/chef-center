# frozen_string_literal: true

# Role show decorator
class Role::ShowDecorator < ApplicationDecorator
  property :id
  property :name
  property :description
  property :default_attributes
  property :override_attributes
  property :run_list
  property :env_run_lists
end
