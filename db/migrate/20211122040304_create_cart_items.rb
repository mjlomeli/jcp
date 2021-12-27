class CreateCartItems < ActiveRecord::Migration[5.2]
  def change
    create_table :cart_items do |t|
      t.decimal :product_id, null: false, limit: 15
      t.decimal :user_id, null: false, limit: 15
      t.integer :quantity, null: false
      t.timestamps
    end
    change_column :cart_items, :id, :decimal, limit: 15
    add_index :cart_items, :product_id
    add_index :cart_items, :user_id
    add_index :cart_items, [:product_id, :user_id], unique: true
  end
end
