# frozen_string_literal: true

# Controller for /status
class StatusController < ApplicationController
  def index
    run GetStatus
  end
end
