# == Schema Information
#
# Table name: games
#
#  id        :integer          not null, primary key
#  name      :string(255)
#  player_id :integer
#  result    :boolean
#

class Game < ActiveRecord::Base
  attr_accessible :name, :player_id, :result
  belongs_to :user
end
