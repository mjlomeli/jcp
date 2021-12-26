class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.float :price, null: false
      t.integer :quantity, default: 1
      t.string :description
      t.integer :user_id, null: false
      t.integer :shop_id, null: false
      t.string :state, default: 'active'
      t.string :category_id
      t.string :categories, array: true, default: []
      t.integer :creation_tsz
      t.integer :ending_tsz
      t.integer :original_creation_tsz
      t.integer :last_modified_tsz
      t.string :currency_code
      t.string :sku, array: true, default: []
      t.string :tags, array: true, default: []
      t.string :materials, array: true, default: []
      t.string :shop_section_id
      t.string :featured_rank
      t.integer :state_tsz
      t.string :url
      t.integer :views, default: 0
      t.integer :num_favorers, default: 0
      t.string :shipping_template_id
      t.integer :processing_min
      t.integer :processing_max
      t.string :who_made
      t.boolean :is_supply, default: false
      t.string :when_made
      t.float :item_weight
      t.string :item_weight_unit, default: 'g'
      t.float :item_length
      t.float :item_width
      t.float :item_height
      t.float :item_dimensions_unit, default: 'mm'
      t.boolean :is_private, default: false
      t.string :style
      t.boolean :non_taxable, default: false
      t.boolean :is_customizable, default: false
      t.boolean :is_digital, default: false
      t.string :file_data
      t.boolean :should_auto_renew, default: false
      t.string :language
      t.boolean :has_variations
      t.integer :taxonomy_id
      t.string :taxonomy_path, array: true, default: []
      t.boolean :used_manufacturer, default: false
      t.boolean :is_vintage, default: false
      t.integer :results_per_page, default: 100
      t.integer :page_number
      t.timestamps
    end
    add_index :products, :user_id
    add_index :products, :shop_id
  end
end
