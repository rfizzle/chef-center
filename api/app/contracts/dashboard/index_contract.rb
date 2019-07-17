# frozen_string_literal: true

# Dashboard index contract
class Dashboard::IndexContract < Dry::Validation::Contract
  params do
    optional(:all_time).filled(:str?)
    optional(:start_time).filled(:str?)
    optional(:end_time).filled(:str?)
  end
end
