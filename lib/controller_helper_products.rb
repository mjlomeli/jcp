def product_locate_error(**query)
  product_ids = query[:product_ids] || []
  if product_ids.empty?
    { query.keys.to_s => ["Could not locate product with given params: #{query.to_s}"] }
  else
    product_ids.map { |id| [id, ["Could not locate product id: #{id}"]] }.to_h
  end
end

def product_error(**query)
  product = query[:product]
  products = product && [product] || query[:products] || []
  return {} if products.empty?
  products.map { |prod| [prod.id, prod.errors.full_messages] }.to_h
end

def to_products_json(products: [], images: [], error_products: [], error_ids: [])
  listing = {}

  listing[:products] = {} unless products.empty?
  products.each { |product| listing[:products][product.id] = product }

  listing[:images] = {} unless images.empty?
  images.each do |image|
    if listing[:images].key?(image.group_id)
      listing[:images][image.group_id][image.dimension] = image
    else
      listing[:images][image.group_id] = { image.dimension => image }
    end
  end

  listing[:errors] = {} unless error_products.empty? and error_ids.empty?
  listing[:errors].merge!(product_error(products: error_products)) unless error_products.empty?
  listing[:errors].merge!(product_locate_error(product_ids: error_ids)) unless error_ids.empty?

  listing
end

def fetch_products_with_images

end

def groups_from_params(query)
  tags = query[:tags] ? query[:tags].to_set : []
  materials = query[:materials] ? query[:materials].to_set : []
  taxonomy_paths = query[:taxonomy_paths] ? query[:taxonomy_paths].to_set : []

  queries = []
  queries.concat(tags.map { |t| "'#{t}' = any (products.tags)" }) unless tags.empty?
  queries.concat(materials.map { |m| "'#{m}' = any (products.materials)" }) unless materials.empty?
  queries.concat(taxonomy_paths.map { |t| "'#{t}' = any (products.taxonomy_path)" }) unless taxonomy_paths.empty?

  Product.where(queries.join(" or "))
end
