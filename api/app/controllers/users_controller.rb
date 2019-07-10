# frozen_string_literal: true

# Authenticated controller
class UsersController < AuthenticatedController
  def index
    run User::Index
  end

  def show
    run User::Show
  end
end
