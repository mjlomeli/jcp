class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :order_id, null: false
      t.integer :product_id, null: false
      t.integer :user_id, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
    add_index :orders, :order_id
    add_index :orders, :product_id
    add_index :orders, :user_id
    add_index :orders, [:order_id, :product_id, :user_id], unique: true
  end
end
