# frozen_string_literal: true

# Cookbook recipes operation
class Cookbook::Recipes < Transaction
  DECORATOR = Cookbook::RecipesDecorator

  step :find_recipes

  def find_recipes(input)
    # Use the chef HTTP client to get a list of cookbook
    raw_recipes_list = Rails.application.config.chef_client.get("/cookbooks/_recipes")

    input[:recipes] = { recipes: raw_recipes_list }

    # Set the cookbook as the models
    ctx[:model] = input[:recipes]

    # Return success
    Success(input[:recipes])
  end
end
