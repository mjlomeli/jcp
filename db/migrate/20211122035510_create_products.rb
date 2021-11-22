class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.float :price, null: false
      t.integer :quantity, default: 1
      t.string :description, null: false
      t.string :image_url, null: false
      t.string :video_url
      t.string :category
      t.string :tags
      t.date :production_date, null: false
      t.integer :user_id, null: false
      t.integer :store_id, null: false
      t.string :shipping_address, null: false
      t.float :shipping_fee, null: false

      t.timestamps
    end
    add_index :products, :user_id
  end
end
