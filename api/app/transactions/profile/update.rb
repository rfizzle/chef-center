# frozen_string_literal: true

# Profile index operation
class Profile::Update < Transaction
  CONTRACT = Profile::UpdateContract
  DECORATOR = User::ShowDecorator
  step :find_model
  step :update_user

  def find_model(input)
    ctx[:model] = input[:current_user]
    Success(input[:params])
  end

  def update_user(params)
    ctx[:model].update(
      name: params[:name]
    )
    ctx[:model].save ? Success(ctx[:model]) : Failure(ErrorService.bad_request_fail(message: 'Profile update failed'))
  end
end
