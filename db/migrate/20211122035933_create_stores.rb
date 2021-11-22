class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.string :icon
      t.string :cover_image

      t.timestamps
    end
    add_index :stores, :name, unique: true
    add_index :stores, :user_id, unique: true
  end
end
