# frozen_string_literal: true

# Report node operation
class Report::Show < Transaction
  DECORATOR = Report::ShowDecorator

  step :find_report

  def find_report(input)
    # Need these headers for the server
    protocol_version = '0.1.0'
    headers = { 'X-Ops-Reporting-Protocol-Version' => protocol_version }

    # Use the chef HTTP client to get a list of reports
    report = Rails.application.config.chef_client.get("/reports/org/runs/#{input[:params][:id]}", headers)

    # Set the reports as the models
    ctx[:model] = report

    # Return success
    Success(report)
  end
end
