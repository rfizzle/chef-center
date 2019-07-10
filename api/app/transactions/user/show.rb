# frozen_string_literal: true

# User index operation
class User::Show < Transaction
  CONTRACT = User::ShowContract
  DECORATOR = User::ShowDecorator

  step :find_model

  def find_model(input)
    ctx[:model] = User.find(input[:params][:id])
    ctx[:model] ? Success(ctx[:model]) : Failure(ErrorService.bad_request_fail(message: 'Invalid user ID'))
  end
end
