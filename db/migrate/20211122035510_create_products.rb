class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.float :price, null: false
      t.integer :quantity, default: 1
      t.integer :views, default: 0
      t.integer :num_favorers, default: 0
      t.string :description, null: false
      t.string :image_urls, null: false
      t.string :category
      t.string :tags
      t.integer :user_id, null: false
      t.integer :store_id, null: false

      t.timestamps
    end
    add_index :products, :user_id
  end
end
