# frozen_string_literal: true

# Auth check authentication decorator
class Auth::CheckAuthenticationDecorator < ApplicationDecorator
  property :name
  property :email
end
