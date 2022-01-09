def users_from_params(query)
  user_ids = query[:user_ids] || []
  User.where(id: user_ids)
end

def shops_from_params(query)
  shop_ids = query[:shop_ids] || []
  Shop.where(id: shop_ids)
end

def products_from_params(query)
  product_ids = query[:product_ids] || []
  Product.where(id: product_ids)
end

def images_from_params(query)
  image_ids = query[:image_ids] || []
  Image.where(id: image_ids)
end

def reviews_from_params(query)
  review_ids = query[:review_ids] || []
  Review.where(id: review_ids)
end

def cart_items_from_params(query)
  cart_item_ids = query[:cart_item_ids] || []
  CartItem.where(id: cart_item_ids)
end

def carts_from_params(query)
  user_ids = query[:user_ids] || []
  CartItem.where(user_id: user_ids)
end

def to_array(value)
  if value.is_a? String
    JSON.parse(value.gsub("'", '"')) rescue nil
  else
    Array(params[value]) rescue nil #converts to an Array on fail set to nil
  end
end

def valid_dimension?(query)
  return false unless query.key?(:dimension)
  dimension = query[:dimension]
  image = %w[image_small image_medium image_large image_full].include?(dimension)
  icon = %w[icon_small icon_medium icon_large icon_full].include?(dimension)
  image or icon
end

def valid_group_name?(query)
  return false unless query.key?(:group_name)
  group_name = query[:group_name]
  %w[product user shop].include?(group_name)
end

def validate_range(index, count)
  return index if !index or (0 <= index and index < count)
  return 0 if index < 0
  return count if index >= count
  index
end

def range_from_params(query, model)
  count = model.count
  start = validate_range(query[:start], count)
  finish = validate_range(query[:end], count)
  limit = validate_range(query[:limit], count)

  start = start || finish && limit && [finish - limit, 0].max || 0
  finish = finish && [finish, start].max || !limit && count || [start+limit, count].min
  limit = limit && [finish - start, limit].min || finish - start

  { start: start, end: finish, limit: limit, random: query[:random] }
end
