# frozen_string_literal: true

# Cookbooks controller
class ClientsController < AuthenticatedController
  def index
    run Client::Index
  end

  def show
    run Client::Show
  end
end
