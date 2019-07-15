# frozen_string_literal: true

# Report index decorator
class Report::IndexDecorator < ApplicationDecorator
  property :run_id
  property :start_time
  property :end_time
  property :total_res_count
  property :status
  property :run_list
  property :resources
  property :data
  property :node_name
end
