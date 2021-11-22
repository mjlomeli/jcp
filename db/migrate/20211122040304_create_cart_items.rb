class CreateCartItems < ActiveRecord::Migration[6.1]
  def change
    create_table :cart_items do |t|
      t.integer :product_id, null: false
      t.integer :quantity, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :cart_items, :product_id
    add_index :cart_items, :user_id
    add_index :cart_items, [:product_id, :user_id], unique: true
  end
end
