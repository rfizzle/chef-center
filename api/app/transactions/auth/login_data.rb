# frozen_string_literal: true

# User authenticate operation (server step 0)
class Auth::LoginData < AuthTransaction
  CONTRACT = Auth::LoginDataContract

  step :get_user_from_email_param
  step :get_kdf_salt

  def get_kdf_salt(input)
    ctx[:raw_response] = { kdf_salt: ctx[:user].kdf_salt }
    Success(input)
  end
end
