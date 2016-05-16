class SetWaitingForPlayersDefault < ActiveRecord::Migration
  def change
    change_column :games, :waiting_for_players, :boolean,  :null => false, :default => true
  end
end
