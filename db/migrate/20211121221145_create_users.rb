class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :phone
      t.string :bio
      t.decimal :image_ids, array: true, default: [], limit: 15
      t.decimal :icon_ids, array: true, default: [], limit: 15

      t.timestamps
    end
    change_column :users, :id, :decimal, limit: 15
    add_index :users, :email
    add_index :users, :session_token
    add_index :users, :password_digest
  end
end
