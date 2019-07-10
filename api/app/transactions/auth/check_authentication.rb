# frozen_string_literal: true

# User authenticate check transaction
class Auth::CheckAuthentication < AuthTransaction
  step :get_jwt
  step :get_user_from_jwt
  step :return_user

  def get_user_from_jwt(input)
    begin
      decoded_jwt = AccessToken.decode(ctx[:jwt])
      ctx[:user] = User.find(decoded_jwt[:sub])
    rescue JWT::ExpiredSignature
      ctx[:user] = nil
      ctx[:session].clear
    end
    ctx[:user] ? Success(input) : Failure(ErrorService.bad_request_fail(message: "Invalid session"))
  end

  def return_user(input)
    ctx[:raw_response] = { email: ctx[:user].email, name: ctx[:user].name }
    Success(input)
  end
end
