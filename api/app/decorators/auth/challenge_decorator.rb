# frozen_string_literal: true

# Auth challenge decorator
class Auth::ChallengeDecorator < ApplicationDecorator
  property :B
  property :salt
end
