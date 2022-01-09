Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

    # API routes
    namespace :api, defaults: { format: :json } do
      resource :session, only: [:create, :destroy]

      resources :users, only: [:index] do
        resources :reviews, only: [:index]
        resources :cart_items, only: [:index, :create, :destroy, :update]
      end

      resources :products, only: [:index] do
        resources :reviews, only: [:index, :create, :update, :destroy]
      end

      resources :images
      resources :shops

      # only for testing
      resources :cart_items, only: [:index]
      resources :reviews, only: [:index]



      get 'product/:id', to: 'products#show'
      post 'product', to: 'products#create'
      patch 'product/:id', to: 'products#update'
      delete 'product/:id', to: 'products#destroy'

      get 'products/users', to: 'products#from_users'
      get 'products/users/:id', to: 'products#from_users'
      get 'products/shops', to: 'products#from_shops'
      get 'products/shops/:id', to: 'products#from_shops'
      get 'products/groups', to: 'products#from_groups'

      get 'products/query', to: 'products#query'
      get 'products/pages', to: 'products#pages'
      get 'products/listings', to: 'products#listings'
      get 'products/price_range', to: 'products#price_range'
      get 'products/popular', to: 'products#popular'

      delete 'products', to: 'products#destroys'
    end

    # Home_page page route
    root to: 'root#root'
end
