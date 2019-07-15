# frozen_string_literal: true

# User index operation
class Report::Index < Transaction
  DECORATOR = Report::IndexDecorator

  step :find_reports

  def find_reports(_input)
    # Need these headers for the server
    protocol_version = '0.1.0'
    headers = { 'X-Ops-Reporting-Protocol-Version' => protocol_version }

    # Use the chef HTTP client to get a list of reports
    reports = Rails.application.config.chef_client.get('/reports/org/runs', headers)['run_history']

    # Set the reports as the models
    ctx[:model] = reports

    # Return success
    Success(reports)
  end
end
