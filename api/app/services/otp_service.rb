# frozen_string_literal: true

# OTP service for validating user OTP submissions and setup
class OtpService
  # Check if the registration parameters include OTP values and validate if so.
  #
  # @param params [Hash] the request parameters
  # @return [Integer, false]
  def self.check_setup_parameters(params)
    # Return true if the registration does not have a MFA secret
    return 0 unless params[:mfa_secret]

    # Return false if there is no MFA OTP parameter
    return false unless params[:mfa_otp]

    # Create the TOTP object with the MFA secret
    totp = ROTP::TOTP.new(params[:mfa_secret])

    # Verify the OTP is valid
    verified = totp.verify(params[:mfa_otp], drift_ahead: 15, drift_behind: 15)

    # Return false if the OTP was invalid
    verified || false
  end

  # Check if user has MFA enabled and verify the OTP if so.
  #
  # @param user [User]
  # @param params [Hash]
  # @return [true, false]
  def self.verify(user, params)
    # Return true if the user does not have MFA enabled
    return true unless user.mfa_enabled

    # Return false if there is no OTP parameter
    return false unless params[:otp]

    # Create the TOTP object with the user's OTP secret
    totp = ROTP::TOTP.new(user.otp_secret)

    # Get the last used OTP to prevent replay attacks
    last_otp = user.last_otp_at

    # Verify the OTP is valid
    verified = totp.verify(params[:otp], drift_ahead: 15, drift_behind: 15, after: last_otp)

    # Return false if the OTP was invalid
    return false unless verified

    # Update the database with the latest used OTP
    user.update(last_otp_at: verified)
  end
end
