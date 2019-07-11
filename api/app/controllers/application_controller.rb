# frozen_string_literal: true

# Main application controller
class ApplicationController < ActionController::API
  include ActionController::Cookies

  # Execute a transaction
  #
  # @param transaction [Transaction]
  def run(transaction)
    result = transaction.run(_default_run_options)
    result.success? ? op_success(result.success) : op_fail(result.failure)
  end

  # Return error response
  #
  # @param message [String] the error message to add to the response
  # @param status [Symbol] the response status code
  # @return [String] JSON response
  def error_response(message, status = :internal_server_error)
    render json: { status: 'error', message: message }, status: status
    false
  end

  def check_authentication
    result = Auth::CheckAuthentication.run(_default_run_options)
    result.success? ? @current_user = result.success[:model] : not_authorized
  end

  private

  # Default parameters to pass to operation
  #
  # @return [Hash] the options to pass to operation
  def _default_run_options
    {
      params: params.to_unsafe_h.deep_symbolize_keys,
      session: session,
      request: request,
      response: response,
      current_user: @current_user
    }
  end

  # Return not authorized response
  #
  # @return [String] JSON response
  def not_authorized
    session[:jwt] = nil
    session.destroy
    error_response('Not authorized', :unauthorized)
  end

  # Set JSON success status hash
  #
  # @param data [Object] the success object to add to the response
  # @return [Hash] the response hash
  def json_success(data, extra = nil)
    res = { status: 'success', data: data }
    return res unless extra

    res.merge(extra: extra)
  end

  # Set JSON failure status hash
  #
  # @param data [hash] the failure hash to add to the response
  # @return [Hash] the response hash
  def json_fail(data)
    { status: 'fail', data: data }
  end

  # Set JSON error status hash
  #
  # @param message [String] the error message to add to the response
  # @return [Hash] the response hash
  def json_error(message = 'An error occurred')
    { status: 'error', message: message }
  end

  # Return correct formatted response
  #
  # @param result [Success] operation result
  # @return [String] JSON response
  def op_success(result)
    render json: json_success(decorator_map(result), result[:extra])
  end

  # Return correct formatted response for operation failures
  #
  # @param result [Failure] operation result
  # @return [FalseClass] renders the json response and returns false
  def op_fail(result) # rubocop:disable Metrics/AbcSize
    status_code = result[:error][:status] || :unprocessable_entity

    if result[:error].nil?
      render json: json_error('Error'), status: :internal_server_error
    elsif result[:error][:type] == :error
      render json: json_error(result[:error][:message]), status: status_code
    elsif result[:error][:type] == :fail
      render json: json_fail(result[:error][:data]), status: status_code
    else
      render json: json_fail({}), status: status_code
    end

    false
  end

  # Determines if a result model is iterable or a single object
  #
  # @param result [Success] operation success result
  # @return [Object, Array<Object>] returns either a prebuilt response, a single represented object, or an array of
  #   represented objects
  def decorator_map(result)
    return (result[:raw_response] || {}) unless result[:decorator]

    if result[:model].respond_to?(:to_ary)
      result[:model].map { |x| result[:decorator].new(handle_hash(x)) }
    else
      result[:decorator].new(handle_hash(result[:model]))
    end
  end

  # Convert hashes to OpenStruct so the decorators can read them
  #
  # @param obj [Object] the object to check
  # @return [OpenStruct, Object] returns an OpenStruct if object is hash
  def handle_hash(obj)
    if obj.is_a? Hash
      JSON.parse(obj.to_json, object_class: OpenStruct)
    else
      obj
    end
  end
end
