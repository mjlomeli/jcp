class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :image_small
      t.string :image_medium
      t.string :image_large
      t.string :image_full
      t.string :data
      t.string :mimetype
      t.integer :size
      t.string :url
      t.string :encoding
    end
    add_index :images, :url
  end
end
