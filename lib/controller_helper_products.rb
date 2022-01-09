
def product_locate_error(**query)
  product_id = query[:product_id]
  product_ids = product_id && [product_id] || query[:product_ids] || []
  return {} if product_ids.empty?
  product_ids.map{|id| [id, ["Could not locate product id: #{id}"]]}.to_h
end

def product_error(**query)
  product = query[:product]
  products = product && [product] || query[:products] || []
  return {} if products.empty?
  products.map{|prod| [prod.id, prod.errors.full_messages]}.to_h
end

def fetch_product
  @product = product_from_params(@query)
  if @product
    render json: {products: {@product.id => @product}}
  else
    render json: product_locate_error(**@query)
  end
end

def fetch_products
  @products = products_from_params(@query)
  if @products and !@products.empty?
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: product_locate_error(**@query)
  end
end

def fetch_product_listing
  product = product_from_params(@query)
  if product
    listing = {products: {product.id => product}, images: {}}
    product.images_resized(@query[:dimension] || 'all').each do |image|
      if listing[:images].key?(image.group_id)
        listing[:images][image.group_id][image.dimension] = image
      else
        listing[:images][image.group_id] = {image.dimension => image}
      end
    end
    render json: listing
  else
    render json: product_locate_error(**@query)
  end
end


def fetch_products_listings
  listing = {products: {}, images: {}}

  @products = products_from_params(@query)
  if @products and !@products.empty?
    @products.each do |product|
      listing[:products][product.id] = product
      product.images_resized(@query[:dimension] || 'all').each do |image|
        if listing[:images].key?(image.group_id)
          listing[:images][image.group_id][image.dimension] = image
        else
          listing[:images][image.group_id] = {image.dimension => image}
        end
      end
    end
    render json: listing
  else
    render json: product_locate_error(**@query)
  end
end

def fetch_shop_products
  shop = shop_from_params(@query)
  if shop
    listing = {products: {}}
    shop.products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: product_locate_error(**@query)
  end
end

def fetch_user_products
  user = user_from_params(@query)
  if user
    listing = {products: {}}
    user.products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: product_locate_error(**@query)
  end
end

def fetch_group_products
  queries = []
  queries << "'#{@query[:tag]}' = any (products.tags)" if @query[:tag]
  queries << "'#{@query[:material]}' = any (products.materials)" if @query[:material]
  queries << "'#{@query[:taxonomy_path]}' = any (products.taxonomy_path)" if @query[:taxonomy_path]

  @products = Product.where(queries.join(" or "))
  if @products and !@products.empty?
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: ["Could not find products with {tags: #{@query[:tags]}, materials: #{@query[:materials]}, taxonomy_path: #{@query[:taxonomy_path]}}"], status: 400
  end
end

def fetch_groups_products
  tags = @query[:tags] ? @query[:tags].to_set : []
  materials = @query[:materials] ? @query[:materials].to_set : []
  taxonomy_paths = @query[:taxonomy_paths] ? @query[:taxonomy_paths].to_set : []

  queries = []
  queries.concat(tags.map{|t| "'#{t}' = any (products.tags)"}) unless tags.empty?
  queries.concat(materials.map{|m| "'#{m}' = any (products.materials)"}) unless materials.empty?
  queries.concat(taxonomy_paths.map{|t| "'#{t}' = any (products.taxonomy_path)"}) unless taxonomy_paths.empty?

  @products = queries.empty? ? [] : Product.where(queries.join(" or "))
  if @products and !@products.empty?
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: ["Could not find products with {tags: #{@query[:tags]}, materials: #{@query[:materials]}, taxonomy_path: #{@query[:taxonomy_path]}}"], status: 400
  end
end

def fetch_product_range
  ranges = range_from_params(@query, Product)
  start, finish, limit, random = ranges.values_at(:start, :end, :limit, :random)
  products = Product.offset(start).limit(finish - start)
  if random
    @products = []
    while @products.length < limit
      offset = rand(products.count)
      @products.append(products.offset(offset).first)
    end
  else
    @products = products.limit(limit)
  end
  if @products and !@products.empty?
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: ["Could not find product range with #{@query}"], status: 400
  end
end

def fetch_price_range
  if @query.key?(:price_min) and @query.key?(:price_max)
    @products = Product.where("products.price >= #{@query[:price_min]} and products.price <= #{@query[:price_max]}")
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: ["Could not find products price range with {price_min: #{@query[:price_min]}, price_max: #{@query[:price_max]}}"], status: 400
  end
end


def fetch_views_range
  if @query.key?(:views_highest)
    @products = Product.order(views: :desc)
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  elsif @query.key?(:views_lowest)
    @products = Product.order(views: :asc)
    listing = {products: {}}
    @products.each {|product| listing[:products][product.id] = product}
    render json: listing
  else
    render json: ["Could not find products price range with {price_min: #{@query[:price_min]}, price_max: #{@query[:price_max]}}"], status: 400
  end
end
