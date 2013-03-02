class CreateGamesTable < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string        :name
      t.integer       :player_id
      t.boolean       :result
    end
  end
end
