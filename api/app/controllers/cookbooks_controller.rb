# frozen_string_literal: true

# Cookbooks controller
class CookbooksController < AuthenticatedController
  def index
    run Cookbook::Index
  end

  def show
    run Cookbook::Show
  end

  def recipes
    run Cookbook::Recipes
  end
end
