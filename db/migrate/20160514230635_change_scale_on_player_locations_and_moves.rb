class ChangeScaleOnPlayerLocationsAndMoves < ActiveRecord::Migration
  def change
    change_column :players, :position_x, :decimal, :precision => 5, :scale => 0
    change_column :players, :position_y, :decimal, :precision => 5, :scale => 0
    change_column :players, :action_1_x, :decimal, :precision => 5, :scale => 0
    change_column :players, :action_1_y, :decimal, :precision => 5, :scale => 0
    change_column :players, :action_2_x, :decimal, :precision => 5, :scale => 0
    change_column :players, :action_2_y, :decimal, :precision => 5, :scale => 0
    change_column :players, :action_3_x, :decimal, :precision => 5, :scale => 0
    change_column :players, :action_3_y, :decimal, :precision => 5, :scale => 0
  end
end
