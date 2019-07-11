# frozen_string_literal: true

# Cookbook index decorator
class Cookbook::IndexDecorator < ApplicationDecorator
  property :name
  property :version
end
