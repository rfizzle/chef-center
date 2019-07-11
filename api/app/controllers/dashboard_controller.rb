# frozen_string_literal: true

# Dashboard controller
class DashboardController < AuthenticatedController
  def index
    run Dashboard::Index
  end
end
