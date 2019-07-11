# frozen_string_literal: true

# User token refresh transaction
class Auth::RefreshToken < AuthTransaction
  DECORATOR = Auth::RefreshDecorator

  step :get_jwt
  step :refresh_jwt

  def refresh_jwt(_input)
    jwt = AccessToken.decode(ctx[:jwt])

    # Enforce hard expiration
    return Failure(ErrorService.bad_request_fail(message: 'Expired JWT')) if Time.at(jwt[:hexp]) <= Time.now

    new_jwt = AccessToken.generate_for_user(id: jwt[:sub], email: jwt[:email], scope: jwt[:scope])
    ctx[:session][:jwt] = new_jwt
    ctx[:model] = { jwt: new_jwt }
    Success(ctx[:model])
  end
end
