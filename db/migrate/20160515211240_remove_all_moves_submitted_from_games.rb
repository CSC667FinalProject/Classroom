class RemoveAllMovesSubmittedFromGames < ActiveRecord::Migration
  def change
    remove_column :games, :all_moves_submitted, :integer
  end
end
