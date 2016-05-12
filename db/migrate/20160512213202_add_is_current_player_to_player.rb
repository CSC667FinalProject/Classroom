class AddIsCurrentPlayerToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :is_current_player, :boolean
  end
end
