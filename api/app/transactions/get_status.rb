# frozen_string_literal: true

# Transactions for Status Index
class GetStatus < Transaction
  # Run a transaction through the operation interface
  #
  # @param input [Object] the input for the transaction
  # @return [Success, Failure] returns either success or failure.
  def self.run(input)
    Operation.new.call(
      transaction: self,
      contract: GetStatusContract,
      decorator: nil,
      input: input
    )
  end

  step :status

  def status(_)
    ctx[:raw_response] = { status: 'ok' }
    Success(true)
  end
end
