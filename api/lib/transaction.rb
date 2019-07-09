# frozen_string_literal: true

# High level class for transactions. Used for type validation.
class Transaction
  include Dry::Transaction

  attr_accessor :ctx

  # Run method.
  #
  # @abstract Runs the transaction and dependencies through the operation
  # @param _input [Object] the input for the transaction.
  # @return [Success, Failure] returns either success or failure.
  def self.run(_input)
    raise NotImplementedError
  end
end
