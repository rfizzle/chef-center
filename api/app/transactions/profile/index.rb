# frozen_string_literal: true

# Profile index operation
class Profile::Index < Transaction
  DECORATOR = User::ShowDecorator
  step :find_model

  def find_model(input)
    ctx[:model] = input[:current_user]
    Success(ctx[:model])
  end
end
