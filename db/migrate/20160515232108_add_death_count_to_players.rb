class AddDeathCountToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :deaths, :integer, :null => false, :default => 0
  end
end
