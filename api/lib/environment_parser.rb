# frozen_string_literal: true

module EnvironmentParser
  def self.parse(environment)
    {
      id: environment['name'],
      name: environment['name'],
      chef_type: environment['chef_type'],
      json_class: environment['json_class'],
      description: environment['description'],
      default_attributes: environment['default_attributes'],
      override_attributes: environment['override_attributes'],
      cookbook_versions: environment['cookbook_versions']
    }
  end

  def self.parse_for_update(environment)
    {
      name: environment['name'],
      chef_type: environment['chef_type'],
      json_class: environment['json_class'],
      description: environment['description'],
      default_attributes: environment['default_attributes'],
      override_attributes: environment['override_attributes'],
      cookbook_versions: environment['cookbook_versions']
    }
  end
end
