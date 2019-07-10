# frozen_string_literal: true

# Transactions for Status Index
class Status::Index < Transaction
  step :status

  def status(_)
    ctx[:raw_response] = { status: 'ok' }
    Success(true)
  end
end
