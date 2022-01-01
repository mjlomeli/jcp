class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.decimal :product_id, null: false, limit: 15
      t.decimal :user_id, null: false, limit: 15

      t.timestamps
    end
    add_index :favorites, :product_id
    add_index :favorites, :user_id
  end
end
