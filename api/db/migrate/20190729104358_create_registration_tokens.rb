# frozen_string_literal: true

# Create registration token table
class CreateRegistrationTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :registration_tokens do |t|
      t.string :email
      t.string :token

      t.timestamps
    end
  end
end
