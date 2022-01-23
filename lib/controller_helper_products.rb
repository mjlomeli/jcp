def product_locate_error(query={}, product_ids: [], **kwargs)
  if product_ids.empty?
    { query.keys.to_s => ["Could not locate product with given params: #{query.to_s}"] }
  else
    product_ids.map { |id| [id, ["Could not locate product id: #{id}"]] }.to_h
  end
end

def product_error(product: nil, products: [], **kwargs)
  products = [product] unless product.nil?
  return {} if products.empty?
  products.map { |prod| [prod.id, prod.errors.full_messages] }.to_h
end

def to_products_json(products: [], images: [], reviews: {}, error_products: [], error_ids: [], query: {}, **kwargs)
  listing = {}

  listing[:products] = {} unless products.empty?
  products.each { |product| listing[:products][product.id] = product }

  listing[:reviews] = reviews unless reviews.empty?

  listing[:query] = query unless query.empty?

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

def groups_from_params(tags: [], materials: [], taxonomy_paths: [], **kwargs)
  queries = []
  queries.concat(tags.to_set.map { |t| "'#{t}' = any (products.tags)" }) unless tags.empty?
  queries.concat(materials.to_set.map { |m| "'#{m}' = any (products.materials)" }) unless materials.empty?
  queries.concat(taxonomy_paths.to_set.map { |t| "'#{t}' = any (products.taxonomy_path)" }) unless taxonomy_paths.empty?
  queries.join(" or ")
end

def format_query(query)
  query.downcase.gsub(".", "")
         .gsub(" | ", " ").gsub(" || ", " ")
         .gsub("||", " ").gsub("|", " ").gsub("/", " ")
         .gsub(" - ", " ").gsub("-", " ").gsub(",", " ")
         .gsub("(", "").gsub(")", "")
         .gsub("  ", " ").gsub("  ", " ")
end