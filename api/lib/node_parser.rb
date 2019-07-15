module NodeParser
  def self.parse(raw_node)
    return {
      id: raw_node['name'],
      hostname: raw_node['automatic']['hostname'],
      run_list: raw_node['run_list'],
      expanded_run_list: raw_node['automatic']['expanded_run_list'],
      environment: raw_node['chef_environment'],
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
      mac_address: raw_node['automatic']['macaddress'],
    }
  end
end
