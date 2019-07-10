# frozen_string_literal: true

# Authenticated controller
class AuthenticatedController < ApplicationController
  before_action :check_authentication
end
