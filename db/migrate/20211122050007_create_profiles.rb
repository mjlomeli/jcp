class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.integer :user_id, null: false
      t.string :username, null: false
      t.string :first_name
      t.string :last_name
      t.string :bio
      t.string :image_url

      t.timestamps
    end
    add_index :profiles, :user_id
    add_index :profiles, :username, unique: true
  end
end
