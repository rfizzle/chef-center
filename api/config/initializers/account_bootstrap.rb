# frozen_string_literal: true

if User.count.zero? && RegistrationToken.count.zero?
  token = SecureRandom.hex(32)
  RegistrationToken.create(email: ENV['ADMIN_EMAIL'], token: token)
  puts 'Registration token for ' + ENV['ADMIN_EMAIL'] + ' : ' + token
  Rails.logger.warn('Registration token for ' + ENV['ADMIN_EMAIL'] + ' : ' + token)
elsif User.count.zero?
  puts 'Registration token for ' + RegistrationToken.first.email + ' : ' + RegistrationToken.first.token
  Rails.logger.warn('Registration token for ' + RegistrationToken.first.email + ' : ' + RegistrationToken.first.token)
end
