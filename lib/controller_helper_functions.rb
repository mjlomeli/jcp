
def user_from_params(query)
  user_id = query[:user_id]
  return nil unless !!user_id
  User.find_by(id: user_id)
end

def shop_from_params(query)
  shop_id = query[:shop_id]
  return nil unless !!shop_id
  Shop.find_by(id: shop_id)
end

def shops_from_params(query)
  shop_ids = query[:shop_ids]
  return nil unless !!shop_ids
  Shop.where(id: shop_ids)
end

def product_from_params(query)
  product_id = query[:product_id]
  return nil unless !!product_id
  Product.find_by(id: product_id)
end

def products_from_params(query)
  product_ids = query[:product_ids]
  return nil unless !!product_ids
  Product.where(id: product_ids)
end

def image_from_params(query)
  image_id = query[:image_id]
  return nil unless !!image_id
  Image.find_by(id: image_id)
end

def images_from_params(query)
  image_ids = query[:image_ids]
  return nil unless !!image_ids
  Image.where(id: image_ids)
end

def review_from_params(query)
  review_id = query[:review_id]
  return nil unless !!review_id
  Review.find_by(id: review_id)
end

def reviews_from_params(query)
  review_ids = query[:review_ids]
  return nil unless !!review_ids
  Product.where(id: review_ids)
end

def cart_item_from_params(query)
  cart_item_id = query[:cart_item_id]
  return nil unless !!cart_item_id
  CartItem.find_by(id: cart_item_id)
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

def range_from_params(query, model)
  count = model.count
  start, finish, limit, random = query.values_at(:start, :end, :limit, :random)
  if start
    if start < 0
      start = 0
    elsif start >= count
      start = count
      finish = count
      limit = 0
    end
  end

  if finish
    if finish < 0
      finish = start
    elsif finish > count
      finish = count
    end

    if !!start and start > finish
      finish = start
    end
  end

  if limit
    if limit < 0
      limit = [finish.to_i - start.to_i, finish.to_i].max
    elsif limit > count
      limit = count
    end
  end

  if (!!start and !!finish) == !!limit
    if !finish
      start, finish = [start.to_i, count, count]
    else
      start, finish = [start.to_i, finish]
    end
  elsif limit
    finish = (finish or start.to_i >= count ? count : [count, start.to_i + limit].min)
    start = (start or limit >= finish.to_i ? 0 : finish.to_i - limit)
  end
  limit = finish - start

  { start: start, end: finish, limit: limit, random: random }
end
