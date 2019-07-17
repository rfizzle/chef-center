module RoleParser
  def self.parse(role)
    return {
      id: role['name'],
      name: role['name'],
      chef_type: role['chef_type'],
      json_class: role['json_class'],
      description: role['description'],
      run_list: role['run_list'],
      default_attributes: role['default_attributes'],
      override_attributes: role['override_attributes'],
      env_run_list: role['env_run_lists'],
    }
  end

  def self.parse_for_update(role)
    return {
      name: role['name'],
      chef_type: role['chef_type'],
      json_class: role['json_class'],
      description: role['description'],
      run_list: role['run_list'],
      default_attributes: role['default_attributes'],
      override_attributes: role['override_attributes'],
      env_run_lists: role['env_run_lists'],
    }
  end
end
