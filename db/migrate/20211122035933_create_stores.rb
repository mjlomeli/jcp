class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :shop_name, null: false
      t.string :title
      t.integer :user_id, null: false
      t.string :icon_url
      t.string :medium_image
      t.string :announcement
      t.string :sale_message
      t.string :policy_welcome
      t.string :policy_payment
      t.string :policy_shipping
      t.string :policy_refunds
      t.integer :num_favorers, default: 0
      t.string :listing_active_count, default: 0


      t.timestamps
    end
    add_index :stores, :shop_name, unique: true
    add_index :stores, :user_id, unique: true
  end
end
