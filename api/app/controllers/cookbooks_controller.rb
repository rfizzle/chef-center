# frozen_string_literal: true

# Cookbooks controller
class CookbooksController < AuthenticatedController
  def index
    run Cookbook::Index
  end
end
