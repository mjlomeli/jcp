class CartItem < ApplicationRecord
  validates :user_id, presence: true
  validates :product_id, presence: true
  validates :quantity, presence: true
  validates :user_id, uniqueness: {scope: [:product_id], message: "product is already in the cart"}
  validates :quantity, exclusion: {in: %w[0]}


  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :product,
             foreign_key: :product_id,
             class_name: :Product

  def item_price
    self.quantity * self.product.price
  end

end
