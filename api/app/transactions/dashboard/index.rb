# frozen_string_literal: true

# User index operation
class Dashboard::Index < Transaction
  CONTRACT = Dashboard::IndexContract
  DECORATOR = Dashboard::IndexDecorator

  step :build_model
  step :get_node_count
  step :get_cookbook_count
  step :get_roles_count
  step :get_clients_count
  step :get_run_stats

  def build_model(_input)
    ctx[:model] = {
      nodes: 0,
      cookbooks: 0,
      roles: 0,
      clients: 0,
      successful_runs: 0,
      failed_runs: 0,
      started_runs: 0,
    }
    Success(ctx[:model])
  end

  def get_node_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_nodes = Rails.application.config.chef_client.get('/nodes')

    ctx[:model][:nodes] = raw_nodes.count

    # Return success
    Success(ctx[:model])
  end

  def get_cookbook_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_cookbooks = Rails.application.config.chef_client.get('/cookbooks')

    ctx[:model][:cookbooks] = raw_cookbooks.count

    # Return success
    Success(ctx[:model])
  end

  def get_roles_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_roles = Rails.application.config.chef_client.get('/roles')

    ctx[:model][:roles] = raw_roles.count

    # Return success
    Success(ctx[:model])
  end

  def get_clients_count(_input)
    # Use the chef HTTP client to get a list of node
    raw_clients = Rails.application.config.chef_client.get('/clients')

    ctx[:model][:clients] = raw_clients.count

    # Return success
    Success(ctx[:model])
  end

  def get_run_stats(input)
    # Past 24 hours (default)
    if input.dig(:params, :start_time) && input.dig(:params, :end_time)
      start_time = Date.parse(input.dig(:params, :start_time)).to_time.to_i
      end_time = Date.parse(input.dig(:params, :end_time)).to_time.to_i
    elsif input.dig(:params, :start_time)
      start_time = Date.parse(input.dig(:params, :start_time)).to_time.to_i
      end_time = Time.now.to_i
    else
      start_time = Time.at(Time.now.to_i - 86400).to_i
      end_time = Time.now.to_i
    end

    protocol_version = '0.1.0'
    headers = { 'X-Ops-Reporting-Protocol-Version' => protocol_version }

    if input.dig(:params, :all_time)
      puts '1'
      raw_runs = Rails.application.config.chef_client.get("/reports/org/runs", headers)
    else
      puts '2'
      raw_runs = Rails.application.config.chef_client.get("/reports/org/runs?from=#{start_time}&until=#{end_time}", headers)
    end

    runs = raw_runs["run_history"]

    # Corner case: If no runs have happened in the past 24 hours
    return Success(ctx[:model]) if runs == nil

    ctx[:model][:successful_runs] = runs.count { |x| x['status'] == 'success' }
    ctx[:model][:failed_runs] = runs.count { |x| x['status'] == 'failure' }
    ctx[:model][:started_runs] = runs.count { |x| x['status'] == 'started' }

    Success(ctx[:model])
  end
end
