def users_from_params(query)
  user_id = query[:user_id]
  user_ids = user_id && [user_id] || query[:user_ids] || []
  return nil if !user_ids or user_ids.empty?
  User.where(id: user_ids)
end

def shops_from_params(query)
  shop_id = query[:shop_id]
  shop_ids = shop_id && [shop_id] || query[:shop_ids] || []
  return nil if !shop_ids or shop_ids.empty?
  Shop.where(id: shop_ids)
end

def products_from_params(query)
  product_id = query[:product_id]
  product_ids = product_id && [product_id] || query[:product_ids] || []
  return nil if !product_ids or product_ids.empty?
  Product.where(id: product_ids)
end

def images_from_params(query)
  image_id = query[:image_id]
  image_ids = image_id && [image_id] || query[:image_ids] || []
  return nil if !image_ids or image_ids.empty?
  Image.where(id: image_ids)
end

def reviews_from_params(query)
  review_id = query[:review_id]
  review_ids = review_id && [review_id] || query[:review_ids] || []
  return nil if !review_ids or review_ids.empty?
  Review.where(id: review_ids)
end

def cart_item_from_params(query)
  cart_item_id = query[:cart_item_id]
  cart_item_ids = cart_item_id && [cart_item_id] || query[:cart_item_ids] || []
  return nil if !cart_item_ids or cart_item_ids.empty?
  CartItem.where(id: cart_item_ids)
end

def cart_from_params(query, current_user)
  user_id = query[:user_id]
  return nil unless !!user_id and !!current_user and user_id == current_user.id
  CartItem.where(user_id: user_id)
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
  finish = validate_range(query[:finish], count)
  limit = validate_range(query[:limit], count)

  start = start || finish && limit && [finish - limit, 0].max || 0
  finish = finish && [finish, start].max || !limit && count || [start+limit, count].min
  limit = limit && [finish - start, limit].min || finish - start

  { start: start, end: finish, limit: limit, random: query[:random] }
end
