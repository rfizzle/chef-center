# frozen_string_literal: true

Rails.application.routes.draw do
  # resource :node
  # resource :roles
  # resource :environments
  # resource :cookbooks
  # resource :data
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: 'json' do
    resources :status, only: %i[index]
    resources :dashboard, only: %i[index]

    # Authentication
    resources :authentication, only: %i[] do
      collection do
        post :challenge
        post :authenticate
        post 'login-data', to: :login_data
        get :check
        post :logout
        post :register
        post :refresh
      end
    end

    resources :users

    resources :profile, only: %i[index] do
      collection do
        post :update
      end
    end

    resources :environments, constraints: { id: %r{[^/]+} }

    resources :nodes, constraints: { id: %r{[^/]+} }

    resources :cookbooks, constraints: { id: %r{[^/]+} } do
      collection do
        get :recipes
      end
    end

    resources :roles, constraints: { id: %r{[^/]+} }

    resources :clients, constraints: { id: %r{[^/]+} }
  end
end
