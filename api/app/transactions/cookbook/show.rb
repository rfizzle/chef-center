# frozen_string_literal: true

# Cookbook show operation
class Cookbook::Show < Transaction
  CONTRACT = Cookbook::ShowContract
  #DECORATOR = Cookbook::ShowDecorator

  step :find_cookbook

  def find_cookbook(input)
    # Use the chef HTTP client to get a list of cookbook
    raw_cookbook_list = Rails.application.config.chef_client.get("/cookbooks/#{input[:params][:id]}")

    cookbook_versions = []

    # The cookbook is returned as a list with versions, so we need to get them to get latest
    raw_cookbook_list['chef-client']['versions'].each { |h| cookbook_versions << h['version'] }

    # Sort versions
    sorted_versions = cookbook_versions.sort_by { |v| Gem::Version.new(v) }

    # Support version parameter
    if input[:params][:version]
      version = (sorted_versions.include?(input[:params][:version]) ? input[:params][:version] : sorted_versions[-1])
    else
      version = sorted_versions[-1]
    end

    # Get the full cookbook data
    raw_cookbook = Rails.application.config.chef_client.get("/cookbooks/#{input[:params][:id]}/#{version}")

    # Build the cookbook
    cookbook = raw_cookbook

    # TODO: Update this to use a decorator
    # Set the cookbook as the models
    ctx[:raw_response] = cookbook

    # Return success
    Success(cookbook)
  end
end
