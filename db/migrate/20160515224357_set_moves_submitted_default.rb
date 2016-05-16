class SetMovesSubmittedDefault < ActiveRecord::Migration
  def change
    change_column :games, :moves_submitted, :integer,  :null => false, :default => 0
  end
end
