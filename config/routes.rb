Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

    # API routes
    namespace :api, defaults: { format: :json } do
      resource :session, only: [:create, :destroy]

      resources :users, only: [:index, :create, :show, :update] do
        resources :reviews, only: [:index]
        resources :cart_items, only: [:index, :create, :destroy, :update]
      end

      resources :products, only: [:index, :create, :show, :update, :destroy] do
        resources :reviews, only: [:index, :create, :update, :destroy]
      end

      resources :images
      resources :shops
      resources :cart_items, only: [:index]
    end

    # Home page route
    root to: 'root#root'
end
