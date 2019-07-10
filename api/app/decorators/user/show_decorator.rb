# frozen_string_literal: true

# User list decorator
class User::ShowDecorator < ApplicationDecorator
  property :id, exec_context: :decorator
  property :email
  property :name
  property :created_at
  property :mfa_enabled
  property :public_key

  def id
    represented.id.to_s
  end
end
