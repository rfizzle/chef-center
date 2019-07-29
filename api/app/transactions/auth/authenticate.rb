# frozen_string_literal: true

# User authenticate operation (server step 2)
class Auth::Authenticate < AuthTransaction
  CONTRACT = Auth::AuthenticateContract
  DECORATOR = Auth::AuthenticateDecorator

  step :get_user_from_email_param
  step :start_sirp_verifier
  step :get_proof
  step :verify_session
  step :check_mfa
  step :verify_otp
  step :setup_user_session
  step :setup_user_csrf_token
  step :setup_user_refresh_token
  step :authenticate_response

  def get_proof(input)
    proof = ctx[:user].proof
    ctx[:proof] = JSON.parse(Base64.decode64(proof))
    ctx[:proof] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid proof'))
  end

  def verify_session(input)
    ctx[:h_amk] = ctx[:verifier].verify_session(ctx[:proof], input[:params][:M])
    ctx[:h_amk] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid h_amk'))
  end

  def check_mfa(input)
    mfa_enabled = ctx[:user].mfa_enabled
    mfa_present = input[:params][:otp]
    if mfa_enabled && !mfa_present
      Failure(ErrorService.bad_request_fail(mfa: true))
    else
      Success(input)
    end
  end

  def verify_otp(input)
    result = OtpService.verify(ctx[:user], input[:params])
    result ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Invalid OTP', mfa: true))
  end

  def setup_user_session(input)
    ctx[:session][:jwt] = AccessToken.generate_for_user(id: ctx[:user].id.to_s, email: ctx[:user].email, scope: {})
    ctx[:session][:jwt] ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Error setting up JWT'))
  end

  def setup_user_csrf_token(input)
    ctx[:session][:csrf_token] = SecureRandom.hex(16)
    Success(input)
  end

  def setup_user_refresh_token(input)
    ctx[:user].refresh_token = SecureRandom.hex(32)
    ctx[:user].save ? Success(input) : Failure(ErrorService.bad_request_fail(message: 'Error generating refresh key'))
  end

  def authenticate_response(input)
    ctx[:model] = {
      jwt: ctx[:session][:jwt],
      H_AMK: ctx[:h_amk],
      name: ctx[:user].name,
      aes_iv: ctx[:user].aes_iv,
      pbkdf2_salt: ctx[:user].pbkdf2_salt,
      public_key: ctx[:user].public_key,
      encrypted_private_key: ctx[:user].encrypted_private_key,
      refresh_token: ctx[:user].refresh_token,
      csrf_token: ctx[:session][:csrf_token]
    }
    Success(input)
  end
end
