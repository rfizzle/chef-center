# frozen_string_literal: true

class RegistrationToken < ApplicationRecord
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :token, presence: true
end
