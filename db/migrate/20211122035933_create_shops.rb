class CreateStores < ActiveRecord::Migration[5.2]
  def change
    create_table :stores do |t|
      t.string :shop_name, null: false
      t.string :title
      t.integer :user_id, null: false
      t.string :login_name
      t.integer :creation_tsz
      t.string :announcement
      t.string :currency_code
      t.boolean :is_vacation, default: false
      t.string :vacation_message
      t.string :sale_message
      t.string :digital_sale_message
      t.integer :last_updated_tsz
      t.integer :listing_active_count, default: 0
      t.integer :digital_listing_count, default: 0
      t.boolean :accepts_custom_requests, default: false
      t.string :policy_welcome
      t.string :policy_payment
      t.string :policy_shipping
      t.string :policy_refunds
      t.string :policy_additional
      t.string :policy_seller_info
      t.integer :policy_updated_tsz
      t.boolean :policy_has_private_receipt_info, default: false
      t.string :vacation_autoreply
      t.string :url
      t.integer :num_favorers, default: 0
      t.list :languages
      t.integer :upcoming_local_event_id
      t.boolean :is_using_structured_policies, default: false
      t.boolean :has_onboarded_structured_policies, default: false
      t.boolean :has_unstructured_policies, default: false
      t.boolean :include_dispute_form_link, default: false
      t.boolean :is_direct_checkout_onboarded, default: true
      t.string :policy_privacy
      t.boolean :is_calculated_eligible, default: false
      t.boolean :is_opted_in_to_buyer_promise, default: false
      t.boolean :is_shop_us_based, default: false
      t.integer :results_per_page, default: 100
      t.integer :page_number
      t.integer :image_id, default: 1
      t.integer :icon_id, default: 2


      t.timestamps
    end
    add_index :stores, :shop_name, unique: true
    add_index :stores, :user_id, unique: true
  end
end
