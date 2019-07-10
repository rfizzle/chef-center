# frozen_string_literal: true

# Authenticated controller
class AuthenticationController < ApplicationController
  before_action :check_authentication, only: %i[refresh check]

  def login_data
    run Auth::LoginData
  end

  def challenge
    run Auth::Challenge
  end

  def authenticate
    run Auth::Authenticate
  end

  def check
    run Auth::CheckAuthentication
  end

  def register
    run Auth::Register
  end

  def logout
    run Auth::Logout
  end

  def refresh
    run Auth::RefreshToken
  end
end
