class Image < ApplicationRecord
  validates_presence_of :group_name, :message => "A group name must be provided"
  validates_presence_of :group_id, :message => "The group id is needed. It different image sizes as one group"
  validates_presence_of :dimension, :message => "The image's dimension is needed"

  validates_inclusion_of :group_name, :in => %w(product shop user), :message => "Identify this image as one of the three: [product, shop, user]"
  validates_inclusion_of :dimension, :in => %w(image_small image_medium image_large image_full), :message => "The image must be labeled as on of the four sizes: [image_small, image_medium, image_large, image_full]"

  scope :left_join_products, -> { joins("INNER JOIN products ON images.group_id = any (products.image_ids)") }
  scope :left_join_shops, -> { joins("INNER JOIN products ON images.group_id = any (products.image_ids) INNER JOIN shops ON shops.id = products.shop_id") }
  scope :right_join_products, -> { Product.joins("INNER JOIN images ON images.group_id = any (products.image_ids)") }
  scope :right_join_shops, -> { Shop.joins("INNER JOIN products ON shops.id = products.shop_id INNER JOIN images ON images.group_id = any (products.image_ids)") }

  def source
    if self.data.nil?
      self.url
    else
      "data:#{self.mimetype};base64,#{self.data}"
    end
  end
end

# NOTES:
# Image.joins("INNER JOIN products ON images.group_id = any (products.image_ids)")
#      .joins("INNER JOIN shops ON shops.id = products.shop_id and shops.id in (33496077,33496009,33495919)")
