# frozen_string_literal: true

# User creation service object
class User::CreationService
  # Create a user with the provided parameters. Enable MFA if parameters exist.
  #
  # @param params [Hash] the request parameters
  # @param otp_timestamp [Integer, nil] the otp timestamp or nil
  # @return [User, nil] the created user or nil
  def self.create(params, otp_timestamp: nil)
    # Create user
    user = User.create!(
      email: params[:email],
      name: params[:name],
      salt: params[:salt],
      kdf_salt: params[:kdf_salt],
      verifier: params[:verifier],
      pbkdf2_salt: params[:pbkdf2_salt],
      aes_iv: params[:aes_iv],
      public_key: params[:public_key],
      encrypted_private_key: params[:encrypted_private_key]
    )

    # Return true unless user enabled MFA
    return user unless params[:mfa_secret]

    # Setup MFA for user
    valid = user.update(
      mfa_enabled: true,
      otp_secret: params[:mfa_secret],
      last_otp_at: otp_timestamp
    )

    (valid ? user : nil)
  end
end
