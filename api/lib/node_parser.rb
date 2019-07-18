# frozen_string_literal: true

module NodeParser
  def self.parse(raw_node)
    {
      id: raw_node['name'],
      name: raw_node['name'],
      chef_type: raw_node['chef_type'],
      json_class: raw_node['json_class'],
      chef_environment: raw_node['chef_environment'],
      hostname: raw_node['automatic']['hostname'],
      run_list: raw_node['run_list'],
      expanded_run_list: raw_node['automatic']['expanded_run_list'],
      fqdn: raw_node['automatic']['fqdn'],
      domain: raw_node['automatic']['domain'],
      uptime: raw_node['automatic']['uptime_seconds'],
      last_checkin: raw_node['automatic']['ohai_time'],
      platform: raw_node['automatic']['platform'],
      platform_family: raw_node['automatic']['platform_family'],
      platform_version: raw_node['automatic']['platform_version'],
      roles: raw_node['automatic']['roles'],
      recipes: raw_node['automatic']['recipes'],
      cookbooks: raw_node['automatic']['recipes'],
      os: raw_node['automatic']['os'],
      os_version: raw_node['automatic']['os_version'],
      normal_attributes: raw_node['normal'],
      default_attributes: raw_node['default'],
      override_attributes: raw_node['override'],
      machine_id: raw_node['automatic']['machine_id'],
      machine_name: raw_node['automatic']['machinename'],
      ip_address: raw_node['automatic']['ipaddress'],
      ipv6_address: raw_node['automatic']['ip6address'],
      mac_address: raw_node['automatic']['macaddress']
    }
  end

  def self.parse_for_update(raw_node)
    {
      name: raw_node['name'],
      chef_type: raw_node['chef_type'],
      json_class: raw_node['json_class'],
      chef_environment: raw_node['chef_environment'],
      run_list: raw_node['run_list'],
      override: raw_node['override'],
      normal: raw_node['normal'],
      default: raw_node['default'],
      automatic: raw_node['automatic']
    }
  end
end
