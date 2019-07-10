# frozen_string_literal: true

# User token refresh transaction
class Auth::RefreshToken < Transaction
  step :get_jwt
  step :refresh_jwt

  def refresh_jwt(input)
    jwt = AccessToken.decode(ctx[:jwt])
    new_jwt = AccessToken.generate_for_user(id: jwt[:sub], email: jwt[:email], scope: jwt[:scope])
    ctx[:session][:jwt] = new_jwt
    ctx[:raw_response] = {}
    Success(input)
  end
end