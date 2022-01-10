def image_locate_error(image_ids: [], group_ids: [], **kwargs)

  if !image_ids.empty? && !group_ids.empty?
    image_ids.map { |id| [id, ["Could not locate image with {id: #{id}, group_id = any (#{group_ids})}"]] }.to_h
  elsif !image_ids.empty?
    image_ids.map { |id| [id, ["Could not locate image id: #{id}"]] }.to_h
  elsif !group_ids.empty?
    group_ids.map { |id| [id, ["Could not locate image group_id: #{id}"]] }.to_h
  else
    { query.keys.to_s => ["Could not locate image with given params: #{query.to_s}"] }
  end
end

def image_error(image: nil, images: [], **kwargs)
  images = image && [image] || images
  return {} if images.empty?
  images.map { |prod| [prod.id, prod.errors.full_messages] }.to_h
end

def to_images_json(images: [], error_images: [], error_ids: [], group_ids: [] **kwargs)
  listing = {}

  listing[:images] = {} unless images.empty?
  images.each do |image|
    if listing[:images].key?(image.group_id)
      listing[:images][image.group_id][image.dimension] = image
    else
      listing[:images][image.group_id] = { image.dimension => image }
    end
  end

  listing[:errors] = {} unless error_images.empty? and error_ids.empty?
  listing[:errors].merge!(image_error(images: error_images)) unless error_images.empty?
  listing[:errors].merge!(image_locate_error(image_ids: error_ids)) unless error_ids.empty?
  listing[:errors].merge!(image_locate_error(group_ids: group_ids)) unless group_ids.empty?

  listing
end

def extract_product_ids(query)
  query.permit!.to_h.map do |k, v|
    if %w[id product_id].include?(k)
      [:product_ids, [v]]
    elsif %w[ids]
      [:product_ids, v]
    else
      [k, v]
    end
  end.to_h
end

def extract_shop_ids(query)
  query.permit!.to_h.map do |k, v|
    if %w[id shop_id].include?(k)
      [:shop_ids, [v]]
    elsif %w[ids]
      [:shop_ids, v]
    else
      [k, v]
    end
  end.to_h
end

def extract_user_ids(query)
  query.permit!.to_h.map do |k, v|
    if %w[id user_id].include?(k)
      [:user_ids, [v]]
    elsif %w[ids]
      [:user_ids, v]
    else
      [k, v]
    end
  end.to_h
end

def fetch_image
  @image = images_from_params(@query)
  render json: @image
end

def fetch_images
  @images = images_from_params(@query)
  render json: @images
end

def fetch_user_images
  user = user_from_params(@query)
  if user
    @images = {
      images: user.images,
      icons: user.icons
    }
    render json: @images
  else
    render json: ["Could not find user id: #{params[:user_id]}"], status: 400
  end
end

def fetch_product_images
  product = product_from_params(@query)
  if product
    @images = product.images
    render json: @images
  else
    render json: ["Could not find product id: #{params[:product_id]}"], status: 400
  end
end

def fetch_product_images_resized
  unless valid_dimension?(@query)
    render json: ["Invalid dimension type: #{params[:dimension]}"], status: 400
    return
  end

  product = product_from_params(@query)
  unless product
    render json: ["Could not find product id: #{params[:product_id]}"], status: 400
    return
  end

  @images = product.images_resized(params[:dimension])
  render json: @images
end

def fetch_products_images
  products = products_from_params(@query)

  if products
    @images = {}
    products.each { |product| @images[product.id] = product.images }
    render json: @images
  else
    render json: ["Could not find shop id: #{params[:shop_id]} or use dimension: #{params[:dimension]}"], status: 400
  end
end

def fetch_products_images_resized
  unless valid_dimension?(@query)
    render json: ["Invalid dimension type: #{params[:dimension]}"], status: 400
    return
  end
  products = products_from_params(@query)

  if products
    @images = {}
    products.each { |product| @images[product.id] = product.images_resized(params[:dimension]) }
    render json: @images
  else
    render json: ["Could not find shop id: #{params[:shop_id]} or use dimension: #{params[:dimension]}"], status: 400
  end
end

def fetch_group_images
  unless valid_group_name?(@query)
    render json: ["Invalid group_name type: #{params[:group_name]}"], status: 400
    return
  end

  group_images = images_from_params(@query)
  if group_images and !group_images.empty?
    @images = group_images.where(group_id: params[:group_id], group_name: params[:group_name])
    render json: @images
  else
    render json: ["Could not find images with {image_ids: #{params[:image_id]}, group_id: #{params[:group_id]}, group_name: #{params[:group_name]}}"], status: 400
  end
end

def fetch_group_images_resized
  unless valid_group_name?(@query)
    render json: ["Invalid group_name type: #{params[:group_name]}"], status: 400
    return
  end

  unless valid_dimension?(@query)
    render json: ["Invalid dimension type: #{params[:dimension]}"], status: 400
    return
  end

  group_images = images_from_params(@query)
  if group_images and !group_images.empty?
    @images = group_images.where(group_id: params[:group_id], group_name: params[:group_name], dimension: params[:dimension])
    render json: @images
  else
    render json: ["Could not find product id: #{params[:product_id]} or use dimension: #{params[:dimension]}"], status: 400
  end
end

def fetch_shop_images
  shop = shop_from_params(@query)
  if shop
    @images = {
      shop_icons: shop.shop_icons,
      product_images: shop.product_images
    }
    render json: @images
  else
    render json: ["Could not find shop id: #{params[:shop_id]} or use dimension: #{params[:dimension]}"], status: 400
  end
end

def fetch_shop_images_resized
  unless valid_dimension?(@query)
    render json: ["Invalid dimension type: #{params[:dimension]}"], status: 400
    return
  end

  shop = shops_from_params(@query)
  if shop
    @images = {
      shop_icons: shop.shop_icons,
      product_images: shop.product_images_resized(params[:dimension])
    }
    render json: @images
  else
    render json: ["Could not find shop id: #{params[:shop_id]} or use dimension: #{params[:dimension]}"], status: 400
  end
end

def fetch_shops_images_resized
  unless valid_dimension?(@query)
    render json: ["Invalid dimension type: #{params[:dimension]}"], status: 400
    return
  end

  shops = shops_from_params(@query)
  if shops
    @images = {}
    shops.each do |shop|
      @images[shop.id] = {
        shop_icons: shop.shop_icons,
        product_images: shop.product_images_resized(params[:dimension])
      }
    end
    render json: @images
  else
    render json: ["Could not find shop id: #{params[:shop_id]} or use dimension: #{params[:dimension]}"], status: 400
  end
end