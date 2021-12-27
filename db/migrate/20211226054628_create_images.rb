class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :data
      t.string :mimetype
      t.integer :size
      t.string :url
      t.string :encoding
      t.string :name
      t.string :group_name, null: false
      t.decimal :group_id, null: false, limit: 15
      t.string :dimension, null: false

      t.timestamps
    end
    change_column :images, :id, :decimal, limit: 15
    add_index :images, :url
  end
end
