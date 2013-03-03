class GamesController < ApplicationController
  def new
    users = User.all
    @leaderboard = []
    users.each do |user|
      victories = Game.where("user_id = ? AND result = ?", user.id, true).count
      @leaderboard << [User.find(user.id).name, victories]
    end
  end
  def create
    game = Game.create();
    result = params[:result]
    game.name = 'war'
    game.user_id = @auth.id
    game.result = result
    game.save
    render :json => game
  end
end