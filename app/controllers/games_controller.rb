class GamesController < ApplicationController
  before_filter :check_if_logged_in, :only=>:new

  def new
    @leaderboard = build_leaderboard
  end
  def create
    game = Game.create();
    result = params[:result]
    game.name = 'war'
    game.user_id = @auth.id
    game.result = result
    game.save


    render :json => build_leaderboard
  end
  def get_leaderboard
    binding.pry
  end

  def build_leaderboard
    users = User.all
    @leaderboard = []
    users.each do |user|
      victories = Game.where('user_id = ? AND result = ?', user.id, true).count
      @leaderboard << [user.name, victories]
    end
    @leaderboard
  end

end