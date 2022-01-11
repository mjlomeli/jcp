def users_from_params(user_ids: [], **kwargs)
  User.where(id: user_ids)
end

def shops_from_params(shop_ids: [], **kwargs)
  Shop.where(id: shop_ids)
end

def products_from_params(product_ids: [], **kwargs)
  Product.where(id: product_ids)
end

def images_from_params(image_ids: [], group_ids: [], dimension: nil, group_name: nil, **kwargs)
  search = {}
  search[:id] = image_ids unless image_ids.empty?
  search[:group_id] = group_ids unless group_ids.empty?
  search[:dimension] = dimension if valid_dimension?(dimension: dimension)
  search[:group_name] = group_name if valid_group_name?(group_name:group_name)
  search.empty? ? [] : Image.where(**search).paginate(kwargs)
end

def reviews_from_params(review_ids: [], **kwargs)
  Review.where(id: review_ids).paginate(kwargs)
end

def cart_items_from_params(cart_item_ids: [], **kwargs)
  CartItem.where(id: cart_item_ids).paginate(kwargs)
end

def carts_from_params(user_ids: [], **kwargs)
  CartItem.where(user_id: user_ids).paginate(kwargs)
end

def to_array(value)
  if value.is_a? String
    JSON.parse(value.gsub("'", '"')) rescue nil
  else
    Array(params[value]) rescue nil #converts to an Array on fail set to nil
  end
end

def valid_dimension?(dimension: nil, **kwargs)
  return false unless dimension
  image = %w[image_small image_medium image_large image_full].include?(dimension)
  icon = %w[icon_small icon_medium icon_large icon_full].include?(dimension)
  image or icon
end

def valid_group_name?(group_name: nil, **kwargs)
  return false unless group_name
  %w[product user shop].include?(group_name)
end

def valid_image_params?(group_name: nil, dimension: nil, **kwargs)
  valid_name = group_name.nil? || valid_group_name?(group_name: group_name)
  valid_dimension = dimension.nil? || valid_dimension?(dimension: dimension)
  valid_name and valid_dimension
end