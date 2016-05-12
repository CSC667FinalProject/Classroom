class CreateGameRounds < ActiveRecord::Migration
  def change
    create_table :game_rounds do |t|

      t.timestamps null: false
    end
  end
end
