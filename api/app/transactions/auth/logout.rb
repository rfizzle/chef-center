# frozen_string_literal: true

# User logout transaction
class Auth::Logout < Transaction
  step :clear_session

  def clear_session(input)
    ctx[:session][:jwt] = nil
    ctx[:session].clear
    Success(input)
  end
end