class AddCurrentPositionToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :position_x, :decimal, precision: 10, scale: 10
    add_column :players, :position_y, :decimal, precision: 10, scale: 10
  end
end
