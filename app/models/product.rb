class Product < ApplicationRecord
  validates :title, presence: true
  validates :price, presence: true
  validates :description, presence: true
  validates :user_id, presence: true

  belongs_to :shop,
             foreign_key: :shop_id,
             class_name: :Shop

  has_many :reviews,
           foreign_key: :product_id,
           class_name: :Review

  has_many :carts,
           foreign_key: :product_id,
           class_name: :CartItem

  has_many :carters,
           through: :carts,
           source: :user

  has_many :reference_favorites,
           foreign_key: :product_id,
           class_name: :Favorite

  has_many :favored,
           through: :reference_favorites,
           source: :user


  def images
    imgs = self.image_ids.map {|image_id| Image.where(group_id: image_id, group_name: 'product')}
    imgs.select {|img| !img.nil?}
  end

  def icons
    imgs = self.icon_ids.map {|icon_id| Image.where(group_id: icon_id, group_name: 'product')}
    imgs.select {|img| !img.nil?}
  end


  def num_of_carters
    self.carters.length
  end

end
