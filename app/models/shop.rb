class Shop < ApplicationRecord
  validates :shop_name, presence: true
  validates :user_id, presence: true

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  has_many :products,
           foreign_key: :shop_id,
           class_name: :Product

  has_many :reviews,
           through: :products,
           source: :reviews

  has_many :carters,
           through: :products,
           source: :carters


  def images
    imgs = self.image_ids.map {|image_id| Image.where(group_id: image_id, group_name: 'shop')}
    imgs.select {|img| !img.nil?}
  end

  def icons
    imgs = self.icon_ids.map {|icon_id| Image.where(group_id: icon_id, group_name: 'shop')}
    imgs.select {|img| !img.nil?}
  end


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
