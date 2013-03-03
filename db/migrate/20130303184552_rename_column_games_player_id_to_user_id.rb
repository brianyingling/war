class RenameColumnGamesPlayerIdToUserId < ActiveRecord::Migration
  def change
    rename_column :games, :player_id, :user_id
  end
end
