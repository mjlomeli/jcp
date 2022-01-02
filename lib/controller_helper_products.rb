
def fetch_product
  @product = product_from_params(@query)
  render json: @product
end

def fetch_products
  @products = products_from_params(@query)
  render json: @products
end

def fetch_shop_products

end

def fetch_user_products
  user = user_from_params(@query)
  if user
    @products = user.products
    render json: @products
  else
    render json: ["Could not find user id: #{@query[:user_id]}"], status: 400
  end
end

def fetch_group_products
  queries = []
  queries << "'#{@query[:tag]}' = any (products.tags)" if @query[:tag]
  queries << "'#{@query[:material]}' = any (products.materials)" if @query[:material]
  queries << "'#{@query[:taxonomy_path]}' = any (products.taxonomy_path)" if @query[:taxonomy_path]

  @products = Product.where(queries.join(" or "))
  if @products and !@products.empty?
    render json: @products
  else
    render json: ["Could not find products with {tags: #{@query[:tags]}, materials: #{@query[:materials]}, taxonomy_path: #{@query[:taxonomy_path]}}"], status: 400
  end
end

def product_images_resized(dimension='image_full')
  image_ids = Set[]
  self.products.each {|product| image_ids.merge(product.image_ids)}
  Image.where(group_id: Array(image_ids), group_name: 'product', dimension: dimension)
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
    render json: @products
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
  render json: @products
end


def fetch_price_range

end


def fetch_views_range

end
