class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :first_name, null: false
      t.decimal :product_id, null: false, limit: 15
      t.decimal :user_id, null: false, limit: 15
      t.decimal :rating, null: false
      t.string :comment

      t.timestamps
    end
    change_column :reviews, :id, :decimal, limit: 15
    add_index :reviews, :product_id
    add_index :reviews, :user_id
    add_index :reviews, [:product_id, :user_id], unique: true
  end
end
