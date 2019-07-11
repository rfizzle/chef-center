# frozen_string_literal: true

# Auth login data decorator
class Auth::LoginDataDecorator < ApplicationDecorator
  property :kdf_salt
end
