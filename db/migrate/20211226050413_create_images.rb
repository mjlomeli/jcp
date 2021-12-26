class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :data, null: false
      t.string :mimetype, null: false
      t.integer :size
      t.string :url
      t.string :encoding, null: false
    end
    add_index :images, :url
  end
end
