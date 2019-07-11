# frozen_string_literal: true

# Role index decorator
class Role::IndexDecorator < ApplicationDecorator
  property :name
  property :description
  property :run_list
  property :default_attributes
end
