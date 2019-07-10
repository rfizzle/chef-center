# frozen_string_literal: true

# User authenticate operation (server step 1)
class Auth::Challenge < AuthTransaction
  CONTRACT = Auth::ChallengeContract

  step :get_user_from_email_param
  step :start_sirp_verifier
  step :get_challenge_and_proof
  step :store_proof
  step :challenge_response

  def get_challenge_and_proof(input)
    ctx[:challenge] = ctx[:verifier].get_challenge_and_proof(
      ctx[:user].email,
      ctx[:user].verifier,
      ctx[:user].salt,
      input[:params][:A]
    )
    ctx[:challenge] ? Success(input) : Failure(ErrorService.bad_request_fail(message: "Failed Challenge"))
  end

  def store_proof(input)
    ctx[:user].proof = Base64.encode64(JSON.dump(ctx[:challenge][:proof]))
    ctx[:user].save
    Success(input)
  end

  def challenge_response(input)
    ctx[:raw_response] = ctx[:challenge][:challenge]
    Success(input)
  end
end