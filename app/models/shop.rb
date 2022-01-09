class Shop < ApplicationRecord
  validates :shop_name, presence: true
  validates :user_id, presence: true

  scope :left_join_products, -> { joins("INNER JOIN products ON shops.id = products.shop_id") }
  scope :left_join_images, -> { joins("INNER JOIN products ON shops.id = products.shop_id INNER JOIN images ON images.group_id = any (products.image_ids)") }
  scope :right_join_products, -> { Product.joins("INNER JOIN shops ON shops.id = products.shop_id") }
  scope :right_join_images, -> { Image.joins("INNER JOIN products ON images.group_id = any (products.image_ids) INNER JOIN shops ON shops.id = products.shop_id") }

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User,
             dependent: :destroy

  has_many :products,
           foreign_key: :shop_id,
           class_name: :Product,
           dependent: :destroy

  has_many :reviews,
           through: :products,
           source: :reviews

  has_many :carters,
           through: :products,
           source: :carters

  def shop_images
    Image.where(group_id: self.image_ids, group_name: 'shop')
  end

  def shop_icons
    Image.where(group_id: self.icon_ids, group_name: 'shop')
  end

  def product_images
    image_ids = Set[]
    self.products.each {|product| image_ids.merge(product.image_ids)}
    Image.where(group_id: Array(image_ids), group_name: 'product')
  end

  def product_images_alternative
    # The same as this call
    #Image.joins("JOIN products ON images.group_id = any (products.image_ids) JOIN shops ON shops.id = products.shop_id and shops.id = #{self.id}")
    Image.left_join_products.joins("JOIN shops ON shops.id = products.shop_id and shops.id = #{self.id}")
  end

  def product_icons
    icon_ids = Set[]
    self.products.each {|product| icon_ids.merge(product.icon_ids)}
    Image.where(group_id: Array(icon_ids), group_name: 'product')
  end

  def product_images_resized(dimension='image_full')
    image_ids = Set[]
    self.products.each {|product| image_ids.merge(product.image_ids)}
    Image.where(group_id: Array(image_ids), group_name: 'product', dimension: dimension)
  end

  def product_images_resized_alternative(dimension='image_full')
    # The same as this call
    #Image.joins("JOIN products ON images.group_id = any (products.image_ids) JOIN shops ON shops.id = products.shop_id and images.group_name = 'product' and images.dimension = #{dimension}")
    Image.left_join_products.joins("JOIN shops ON shops.id = products.shop_id and images.group_name = 'product' and images.dimension = '#{dimension}'")
  end

  def product_icons_resized(dimension='image_full')
    icon_ids = Set[]
    self.products.each {|product| icon_ids.merge(product.icon_ids)}
    Image.where(group_id: Array(icon_ids), group_name: 'product', dimension: dimension)
  end

  def rating
    # avoid n+1 searches
    reviews = self.reviews.includes(:reviews)
    total = 0
    reviews.each do |review|
      total += review.rating
    end
    return 0 unless reviews.length > 0
    total.to_f / reviews.length.to_f
  end


  def idk
    a = Api::ImagesController.new
    a.index
  end
end
