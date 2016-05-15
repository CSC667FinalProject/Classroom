class RenameIsActiveColumn < ActiveRecord::Migration
  def change
    rename_column :players, :is_active, :is_alive
  end
end
