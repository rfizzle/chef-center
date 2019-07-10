# frozen_string_literal: true

require 'representable/hash'

# Global application decorator
class ApplicationDecorator < Representable::Decorator
  include Representable::Hash

  defaults render_nil: true
end
