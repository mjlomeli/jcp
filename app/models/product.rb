class Product < ApplicationRecord
  validates :title, presence: true
  validates :price, presence: true
  validates :description, presence: true
  validates :user_id, presence: true

  scope :left_join_shops, -> { joins("INNER JOIN shops ON shops.id = products.shop_id") }
  scope :left_join_images, -> { joins("INNER JOIN images ON images.group_id = any (products.image_ids)") }
  scope :right_join_shops, -> { Shop.joins("INNER JOIN products ON shops.id = products.shop_id") }
  scope :right_join_images, -> { Image.joins("INNER JOIN products ON images.group_id = any (products.image_ids)") }


  scope :images_join, -> { joins("INNER JOIN images ON images.group_id = any (products.image_ids)") }
  scope :shops_join, -> { joins("INNER JOIN shops ON shops.id = products.shop_id") }

  belongs_to :shop,
             foreign_key: :shop_id,
             class_name: :Shop

  has_many :reviews,
           foreign_key: :product_id,
           class_name: :Review,
           dependent: :destroy

  has_many :carts,
           foreign_key: :product_id,
           class_name: :CartItem

  has_many :carters,
           through: :carts,
           source: :user

  has_many :reference_favorites,
           foreign_key: :product_id,
           class_name: :Favorite

  has_many :favorer,
           through: :reference_favorites,
           source: :user

  def images_resized(dimension='all')
    if dimension == 'all'
      Image.where(group_id: self.image_ids, group_name: 'product')
    else
      Image.where(group_id: self.image_ids, group_name: 'product', dimension: dimension)
    end
  end

  def icons_resized(dimension='all')
    if dimension == 'all'
      Image.where(group_id: self.icon_ids, group_name: 'product')
    else
      Image.where(group_id: self.icon_ids, group_name: 'product', dimension: dimension)
    end
  end

  def images
    Image.where(group_id: self.image_ids, group_name: 'product')
  end

  def images_small
    Image.where(group_id: self.image_ids, group_name: 'product', dimension: 'image_small')
  end

  def images_medium
    Image.where(group_id: self.image_ids, group_name: 'product', dimension: 'image_medium')
  end

  def images_large
    Image.where(group_id: self.image_ids, group_name: 'product', dimension: 'image_large')
  end

  def images_full
    Image.where(group_id: self.image_ids, group_name: 'product', dimension: 'image_full')
  end

  def icons
    Image.where(group_id: self.icon_ids, group_name: 'product')
  end

  def icons_small
    Image.where(group_id: self.icon_ids, group_name: 'product', dimension: 'image_small')
  end

  def icons_medium
    Image.where(group_id: self.icon_ids, group_name: 'product', dimension: 'image_medium')
  end

  def icons_large
    Image.where(group_id: self.icon_ids, group_name: 'product', dimension: 'image_large')
  end

  def icons_full
    Image.where(group_id: self.icon_ids, group_name: 'product', dimension: 'image_full')
  end

  def num_of_carters
    self.carters.length
  end

end

# NOTES:
# Image.joins("INNER JOIN products ON images.group_id = any (products.image_ids)")
#      .joins("INNER JOIN shops ON shops.id = products.shop_id and shops.id in (33496077,33496009,33495919)")
