# frozen_string_literal: true

# Node show decorator
class Node::ShowDecorator < ApplicationDecorator
  property :id
  property :hostname
  property :run_list
  property :expanded_run_list
  property :environment
  property :fqdn
  property :domain
  property :uptime
  property :last_checkin
  property :platform
  property :platform_family
  property :platform_version
  property :roles
  property :recipes
  property :cookbooks
  property :os
  property :os_version
  property :normal_attributes
  property :default_attributes
  property :override_attributes
  property :ip_address
  property :ipv6_address
  property :mac_address
end
