# frozen_string_literal: true

# Report node operation
class Report::Node < Transaction
  DECORATOR = Report::IndexDecorator

  step :find_reports

  def find_reports(input)
    # Need these headers for the server
    protocol_version = '0.1.0'
    headers = { 'X-Ops-Reporting-Protocol-Version' => protocol_version }

    # Get start date and end date (default to 24 hour window)
    start_date = input[:params][:start_date] || Time.at(Time.now.to_i - 86_400).to_i
    end_date = input[:params][:end_date] || Time.now.to_i

    # Use the chef HTTP client to get a list of reports
    reports = Rails.application.config.chef_client.get(
      "/reports/nodes/#{input[:params][:id]}/runs?from=#{start_date}&until=#{end_date}", headers
    )['run_history']

    # Set the reports as the models
    ctx[:model] = reports

    # Return success
    Success(reports)
  end
end
