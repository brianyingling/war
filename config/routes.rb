War::Application.routes.draw do
 resources :games, :users

get '/users/new'=>'users#new'

post '/games'=>'games#create'
post '/games/display_leaderboard'=>'games#display_leaderboard'

get '/login'=>'session#new'
post '/login' =>'session#create'
delete '/login'=>'session#destroy'

 root :to=>'home#index'
end
