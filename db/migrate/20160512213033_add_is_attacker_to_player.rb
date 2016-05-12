class AddIsAttackerToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :is_attacker, :boolean
  end
end
