class AddWaitingForPlayersToGame < ActiveRecord::Migration
  def change
    add_column :games, :waiting_for_players, :boolean
  end
end
