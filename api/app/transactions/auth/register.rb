# frozen_string_literal: true

# User registration transaction
class Auth::Register < Transaction
  CONTRACT = Auth::RegisterContract

  step :check_token
  step :check_token_email_match
  step :check_existing
  step :check_mfa
  step :setup_user

  # Ensures valid registration token
  #
  # @param input [Hash] the input value.
  # @return [Success,Failure] fail if token does not exist.
  def check_token(input)
    ctx[:registration_token] = RegistrationToken.find_by(token: input[:params][:token])
    ctx[:registration_token] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid registration token'))
  end

  # Ensures token matches provided email address.
  #
  # @param input [Hash] the input value.
  # @return [Success,Failure] fail if invalid token for user.
  def check_token_email_match(input)
    if ctx[:registration_token].email == input[:params][:email]
      Success(input)
    else
      Failure(ErrorService.bad_request_fail(message: 'Invalid registration token for email'))
    end
  end

  # Ensures uniqueness for email address.
  #
  # @param input [Hash] the input value.
  # @return [Success,Failure] fail if user exists.
  def check_existing(input)
    user = User.find_by(email: input[:params][:email])
    user ? Failure(ErrorService.bad_request_fail(message: 'User exists')) : Success(input)
  end

  # Check if MFA was enabled for the user and if so, validate the request parameters to ensure
  # valid secret and OTP.
  #
  # @param input [Hash] the input value.
  # @return [Success,Failure] fail if otp_timestamp is invalid.
  def check_mfa(input)
    ctx[:otp_timestamp] = OtpService.check_setup_parameters(input[:params])
    ctx[:otp_timestamp] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid MFA'))
  end

  # Setup the user in the database
  #
  # @param input [Object] the input value.
  # @return [Success,Failure] succeed with the newly created user object.
  def setup_user(input)
    # Create user
    ctx[:model] = User::CreationService.create(input[:params], otp_timestamp: ctx[:otp_timestamp])
    ctx[:model] ? Success(ctx[:model]) : Failure(ErrorService.bad_request_fail(message: 'Error setting up user'))
  end
end
