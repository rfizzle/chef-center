# frozen_string_literal: true

# Nodes controller
class NodesController < AuthenticatedController
  def index
    run Node::Index
  end

  def show
    run Node::Show
  end

  def update
    run Node::Update
  end
end
