War::Application.routes.draw do
 resources :users, :games



 get '/login'=>'session#new'
 post '/login' =>'session#create'
 delete '/login'=>'session#destroy'

 root :to=>'home#index'
end
