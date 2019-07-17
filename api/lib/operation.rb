# frozen_string_literal: true

# High level class for operations.
class Operation
  include Dry::Transaction

  attr_reader :ctx

  step :bootstrap
  step :validate
  step :run
  step :represent

  private

  # Bootstraps the operation.
  #
  # @param transaction [Transaction] the transaction to run inside the operation.
  # @param contract [Dry::Validation::Contract]
  # @param decorator []
  # @param input [Hash]
  #
  # @return [Success,Failure] results of the bootstrap
  def bootstrap(transaction:, contract:, decorator:, input:)
    @ctx = {}

    # Validate the submitted parameters
    op_contract = OperationSchema.new.call(
      transaction: transaction,
      contract: contract,
      decorator: decorator,
      input: input
    )

    # Setup objects in the current context
    if op_contract.success?
      ctx[:transaction] = transaction
      ctx[:contract] = contract
      ctx[:decorator] = decorator
      ctx[:dangerous_original_input] = input[:params]
      ctx[:session] = input[:session]
      ctx[:request] = input[:request]
      Success(input)
    else
      Failure(error: ErrorService.bad_request_fail(op_contract.errors.to_h))
    end
  end

  # Global parameter validation method ran for all transactions.
  #
  # @param input [Hash] the input object
  # @return [Success,Failure] the result of the validation
  def validate(input)
    result = ctx[:contract].new.call(input[:params])
    if result.errors.count.positive?
      Failure(error: ErrorService.bad_request_fail(result.errors.to_h))
    else
      ctx[:params] = result.to_h
      Success(input.merge(params: result.to_h))
    end
  end

  # Global run method for transactions
  #
  # @param sanitized_input [Hash] the input that passed the validation (bad/unvalidated data thrown out)
  # @return [Success,Failure] the result of the transaction
  def run(sanitized_input)
    t = ctx[:transaction].new
    t.ctx = ctx
    t.call(sanitized_input) do |result|
      result.success do |success|
        return Success(success)
      end

      result.failure do |error|
        return Failure(error: error)
      end
    end
  end

  # Global decorator generator for transactions
  #
  # @param input [Object] the successful object returned from the run method
  # @return [Success] the final result
  def represent(input)
    result = input
    Success(
      model: ctx[:model],
      decorator: ctx[:decorator],
      result: result,
      extra: ctx[:extra],
      raw_response: ctx[:raw_response]
    )
  end
end
