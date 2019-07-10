# frozen_string_literal: true

# High level class for transactions. Used for type validation.
class Transaction
  CONTRACT = EmptyContract
  DECORATOR = false

  include Dry::Transaction

  attr_accessor :ctx

  # Run a transaction through the operation interface
  #
  # @param input [Object] the input for the transaction
  # @return [Success, Failure] returns either success or failure.
  def self.run(input)
    Operation.new.call(
      transaction: self,
      contract: self::CONTRACT,
      decorator: self::DECORATOR,
      input: input
    )
  end
end
