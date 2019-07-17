# frozen_string_literal: true

# Dashboard index decorator
class Dashboard::IndexDecorator < ApplicationDecorator
  property :nodes
  property :cookbooks
  property :roles
  property :clients
  property :successful_runs
  property :failed_runs
  property :started_runs
end
