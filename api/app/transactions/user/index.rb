# frozen_string_literal: true

# User index operation
class User::Index < Transaction
  DECORATOR = User::ShowDecorator

  step :find_models

  def find_models(_input)
    ctx[:model] = User.all
    Success(ctx[:model])
  end
end
