class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :product_id, null: false
      t.integer :user_id, null: false
      t.integer :rating, null: false
      t.string :comment

      t.timestamps
    end
    add_index :reviews, :product_id
    add_index :reviews, :user_id
    add_index :reviews, [:product_id, :user_id], unique: true
  end
end
