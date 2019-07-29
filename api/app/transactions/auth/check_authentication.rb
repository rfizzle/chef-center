# frozen_string_literal: true

# User authenticate check transaction
class Auth::CheckAuthentication < AuthTransaction
  DECORATOR = Auth::CheckAuthenticationDecorator

  step :get_jwt
  step :get_user_from_jwt
  step :return_user

  def get_user_from_jwt(_input)
    begin
      decoded_jwt = AccessToken.decode(ctx[:jwt])
      ctx[:model] = User.find(decoded_jwt[:sub])
    rescue JWT::ExpiredSignature
      ctx[:session].clear
    end
    ctx[:model] ? Success(ctx[:model]) : Failure(ErrorService.bad_request_fail(message: 'Invalid session'))
  end

  def return_user(user)
    ctx[:model] = { email: user.email, name: user.name }
    Success(user)
  end
end
