# frozen_string_literal: true

# Node index decorator
class Node::IndexDecorator < ApplicationDecorator
  property :id
  property :hostname
  property :fqdn
  property :uptime
  property :last_checkin
  property :platform
  property :roles
end
