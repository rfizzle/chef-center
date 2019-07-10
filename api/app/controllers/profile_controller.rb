# frozen_string_literal: true

# Authenticated controller
class ProfileController < AuthenticatedController
  def index
    run Profile::Index
  end

  def update
    run Profile::Update
  end
end
