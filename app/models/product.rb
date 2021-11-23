class Product < ApplicationRecord
  validates :title, presence: true
  validates :price, presence: true
  validates :description, presence: true
  validates :image_urls, presence: true
  validates :user_id, presence: true
  validates :store_id, presence: true

  belongs_to :store,
             foreign_key: :store_id,
             class_name: :Store

  has_many :reviews,
           foreign_key: :product_id,
           class_name: :Review

  has_many :orders,
          foreign_key: :product_id,
          class_name: :Order

  has_many :carts,
           foreign_key: :product_id,
           class_name: :CartItem

  has_many :carters,
           through: :carts,
           source: :user

  has_many :customers,
           through: :orders,
           source: :user

  def num_of_carters
    self.carters.length
  end

end
