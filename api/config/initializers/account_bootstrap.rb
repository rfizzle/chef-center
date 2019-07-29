if User.count == 0 && RegistrationToken.count == 0
  token = SecureRandom.hex(32)
  RegistrationToken.create(email: ENV['ADMIN_EMAIL'], token: token)
  puts 'Registration token for ' + ENV['ADMIN_EMAIL'] + ' : ' + token
  Rails.logger.warn('Registration token for ' + ENV['ADMIN_EMAIL'] + ' : ' + token)
elsif User.count == 0
  puts 'Registration token for ' + RegistrationToken.first.email + ' : ' + RegistrationToken.first.token
  Rails.logger.warn('Registration token for ' + RegistrationToken.first.email + ' : ' + RegistrationToken.first.token)
end
