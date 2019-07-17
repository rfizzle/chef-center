# frozen_string_literal: true

# Roles controller
class RolesController < AuthenticatedController
  def index
    run Role::Index
  end

  def show
    run Role::Show
  end

  def update
    run Role::Update
  end
end
