Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

    # API routes
    namespace :api, defaults: { format: :json } do
      resource :session, only: [:create, :destroy]
      resources :users, only: [:index, :create, :show, :update]
      resources :products, only: [:index, :create, :show, :update, :destroy]

      # TODO: these two routes need to be nested inside users routes or products_template
      resources :reviews, only: [:index, :create, :show, :update, :destroy]
      resources :cart_items, only: [:create, :show, :update]
    end

    # Home page route
    root to: 'root#root'
end
