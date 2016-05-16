class AddMovesSubmittedToGames < ActiveRecord::Migration
  def change
    add_column :games, :moves_submitted, :integer
  end
end
