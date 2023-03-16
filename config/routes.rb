Rails.application.routes.draw do
  

  resources :friendships, except: [:destroy]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # get "*path", to: "fallback#index"

  delete '/friendships/remove', to: 'friendships#destroy'

  # get '/courses', to: 'courses#render_courses'

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'

  delete '/logout', to: 'sessions#destroy'

  get '/me', to: 'sessions#show'

  # delete '/friendships/remove', to: 'friendships#destroy'

  get '/users/:id', to: 'users#show'

  # get '/courses/:id', to: 'courses#show'


  resources :avatars
  resources :reviews
  resources :courses, only: [:index, :show, :create, :update]
  resources :users, except: [:create]
  # resources :friendships, only: [:index, :show, :create, :update]

end
