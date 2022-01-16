Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

    # API routes
    namespace :api, defaults: { format: :json } do
      resource :session, only: [:create, :destroy]

      resources :users, only: [:index] do
        resources :favorites, only: [:index, :create]
        resources :reviews, only: [:index]
      end

      resources :products, only: [:index] do
        resources :reviews, only: [:index, :create, :update, :destroy]
      end

      resources :shops

      # only for testing
      resources :cart_items, only: [:index]
      resources :reviews, only: [:index]


      ########################################
      # Products
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

      #######################################
      # Images
      get 'image/:id', to: 'images#show'
      post 'image', to: 'images#create'
      patch 'image/:id', to: 'images#update'
      delete 'image/:id', to: 'images#destroy'

      get 'images/products', to: 'images#from_products'
      get 'images/users', to: 'images#from_users'
      get 'images/shops', to: 'images#from_shops'

      get 'images/query', to: 'images#query'
      get 'images/listings', to: 'images#listings'

      delete 'images', to: 'images#destroys'

      #######################################
      # Favorite
      get 'favorite', to: 'favorites#index'
      post 'favorite', to: 'favorites#create'
      delete 'favorite', to: 'favorites#delete'

      #######################################
      # Shop
      get 'shop/listings', to: 'shops#listing'

      #######################################
      # CartItem
      get 'cart_item', to: 'cart_items#index'
      patch 'cart_item', to: 'cart_items#update'
      post 'cart_item', to: 'cart_items#create'
      delete 'cart_item', to: 'cart_items#destroy'

    end

    # Home_page page route
    root to: 'root#root'
end
