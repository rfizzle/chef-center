# frozen_string_literal: true

# Environments controller
class EnvironmentsController < AuthenticatedController
  def index
    run Environment::Index
  end

  def show
    run Environment::Show
  end

  def update
    run Environment::Update
  end
end
