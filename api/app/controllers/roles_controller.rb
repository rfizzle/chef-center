# frozen_string_literal: true

# Roles controller
class RolesController < AuthenticatedController
  def index
    run Role::Index
  end
end
