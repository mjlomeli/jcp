class Store < ApplicationRecord
  validates :shop_name, presence: true
  validates :user_id, presence: true

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  has_many :products,
           foreign_key: :store_id,
           class_name: :Product

  has_many :reviews,
           through: :products,
           source: :reviews

  has_many :orders,
           through: :products,
           source: :orders

  has_many :carters,
           through: :products,
           source: :carters

  has_many :customers,
           through: :orders,
           source: :user

  def num_items_sold
    self.orders.length
  end

  def total_earned
    # reduced the (N+1) query
    orders = self.orders.includes(:product)
    total = 0
    orders.each do |item|
      total += item.item_price
    end
    total
  end

  def rating
    # avoid n+1 searches
    reviews = self.reviews.includes(:reviews)
    total = 0
    reviews.each do |review|
      total += review.rating
    end
    total.to_f / reviews.length.to_f
  end

end
