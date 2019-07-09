# frozen_string_literal: true

Rails.application.routes.draw do
  resources :status, only: %i[index]
  # resource :nodes
  # resource :roles
  # resource :environments
  # resource :cookbooks
  # resource :data
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
