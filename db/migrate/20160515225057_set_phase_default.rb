class SetPhaseDefault < ActiveRecord::Migration
  def change
    change_column :games, :phase, :integer,  :null => false, :default => 1
  end
end
