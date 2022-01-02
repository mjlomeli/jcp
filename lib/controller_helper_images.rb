def fetch_image
  @image = image_from_params(@query)
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
    products.each {|product| @images[product.id] = product.images }
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
    products.each {|product| @images[product.id] = product.images_resized(params[:dimension]) }
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

  shop = shop_from_params(@query)
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