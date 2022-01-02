class Image < ApplicationRecord
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
