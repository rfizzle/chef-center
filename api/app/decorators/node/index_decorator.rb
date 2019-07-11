# frozen_string_literal: true

# User list decorator
class Node::IndexDecorator < ApplicationDecorator
  property :id
  property :hostname
  property :fqdn
  property :uptime
  property :last_checkin
  property :platform
end
