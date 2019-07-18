# frozen_string_literal: true

# JWT class
class AccessToken
  ALGORITHM = 'HS512'
  ISSUER = 'chef-center'
  AUDIENCE = 'chef-center'

  class << self
    def generate_for_user(id:, email:, scope:)
      generate(sub: id, email: email, scope: scope)
    end

    def decode(token)
      jwt = JWT.decode(token, hmac_secret, true, leeway: 30, algorithm: ALGORITHM, iss: ISSUER, aud: AUDIENCE)[0]
      jwt.symbolize_keys
    end

    private

    def generate(payload)
      exp = Time.now.to_i + 3600
      now = Time.now.to_i
      hard_exp = Time.now.to_i + 86_400
      JWT.encode(payload.merge(exp: exp, iss: ISSUER, aud: AUDIENCE, iat: now, nbf: now, hexp: hard_exp), hmac_secret, ALGORITHM)
    end

    def hmac_secret
      Rails.application.secret_key_base
    end
  end
end
