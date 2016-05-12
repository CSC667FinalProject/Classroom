class AddPhaseToGame < ActiveRecord::Migration
  def change
    add_column :games, :phase, :integer
  end
end
