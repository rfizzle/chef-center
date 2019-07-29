# frozen_string_literal: true

# Cookie retrieval methods
class AuthTransaction < Transaction
  # Get JWT from cookie or Authorization header
  #
  # @return [String, NilClass] returns a JWT string or nil.
  def get_jwt(input)
    ctx[:jwt] = get_jwt_from_session(ctx[:session], ctx[:request]) || get_jwt_from_header(ctx[:request]) || nil
    ctx[:jwt] ? Success(input) : Failure(ErrorService.unauthorized_error)
  end

  # Get the user from the database
  #
  # @raise [Errors::DocumentNotFound] If no User found
  # @return [User] the user model
  def get_user_from_email_param(input)
    ctx[:user] = User.find_by(email: input[:params][:email])
    ctx[:user] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid user'))
  end

  # Start the verifier
  #
  def start_sirp_verifier(input)
    ctx[:verifier] = SIRP::Verifier.new(Rails.configuration.sirp_prime)
    ctx[:verifier] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid user'))
  end

  private

  # Get the JWT from the session
  #
  # @param session [ActionDispatch::Session::CookieStore] the request session
  # @param request [Net::HTTP] the request
  # @return [String, NilClass] the JWT or nil
  def get_jwt_from_session(session, request)
    return nil if session.nil?
    return nil if session[:jwt].nil?

    (raise ArgumentError, 'Missing CSRF Token') if session[:csrf_token] != request.headers['X-CSRF-TOKEN']
    session[:jwt]
  end

  # Get the JWT from the Authorization header
  #
  # @param request [ActionDispatch::Request] the request
  # @return [String, NilClass] the JWT or nil
  def get_jwt_from_header(request)
    return nil if request.nil?

    header = request.headers['Authorization']
    return nil if header.nil?

    auth_type, token = header.to_s.split(' ')
    auth_type == 'Bearer' ? token : nil
  end
end
