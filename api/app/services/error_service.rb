# frozen_string_literal: true

# Error response builder module
module ErrorService
  # Bad request error response generator.
  #
  # @param message [String] error message
  # @return [Hash] failure hash
  def self.bad_request_error(message = 'Bad Request')
    {
      type: :error,
      message: message,
      status: :bad_request
    }
  end

  # Bad request fail response generator.
  #
  # @param data [Hash] fail data
  # @return [Hash] failure hash
  def self.bad_request_fail(data)
    {
      type: :fail,
      data: data,
      status: :bad_request
    }
  end

  # Unauthorized error response generator.
  #
  # @param message [String] error message
  # @return [Hash] failure hash
  def self.unauthorized_error(message = 'Unauthorized!')
    {
      type: :error,
      message: message,
      status: :unauthorized
    }
  end
end
