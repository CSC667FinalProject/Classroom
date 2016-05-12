class AddPlayerNumberToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :player_number, :integer
  end
end
