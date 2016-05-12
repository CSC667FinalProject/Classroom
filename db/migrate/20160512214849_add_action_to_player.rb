class AddActionToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :action_1_x, :decimal, precision: 10, scale: 10
    add_column :players, :action_1_y, :decimal, precision: 10, scale: 10
    add_column :players, :action_2_x, :decimal, precision: 10, scale: 10
    add_column :players, :action_2_y, :decimal, precision: 10, scale: 10
    add_column :players, :action_3_x, :decimal, precision: 10, scale: 10
    add_column :players, :action_3_y, :decimal, precision: 10, scale: 10
  end
end
