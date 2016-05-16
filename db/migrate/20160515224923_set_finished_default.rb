class SetFinishedDefault < ActiveRecord::Migration
  def change
    change_column :games, :finished, :boolean,  :null => false, :default => false
  end
end
