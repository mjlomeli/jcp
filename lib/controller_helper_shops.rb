def shop_locate_error(query={}, shop_ids: [], **kwargs)
  if shop_ids.empty?
    { query.keys.to_s => ["Could not locate shop with given params: #{query.to_s}"] }
  else
    shop_ids.map { |id| [id, ["Could not locate shop id: #{id}"]] }.to_h
  end
end

def shop_error(shop: nil, shops: [], **kwargs)
  shops = [shop] unless shop.nil?
  return {} if shops.empty?
  shops.map { |s| [s.id, s.errors.full_messages] }.to_h
end

def to_shops_json(shops: [], images: [], error_shops: [], error_ids: [], **kwargs)
  listing = {}

  listing[:shops] = {} unless shops.empty?
  shops.each { |shop| listing[:shops][shop.id] = shop }

  listing[:images] = {} unless images.empty?
  images.each do |image|
    if listing[:images].key?(image.group_id)
      listing[:images][image.group_id][image.dimension] = image
    else
      listing[:images][image.group_id] = { image.dimension => image }
    end
  end

  listing[:errors] = {} unless error_shops.empty? and error_ids.empty?
  listing[:errors].merge!(shop_error(shops: error_shops)) unless error_shops.empty?
  listing[:errors].merge!(shop_locate_error(shop_ids: error_ids)) unless error_ids.empty?

  listing
end
