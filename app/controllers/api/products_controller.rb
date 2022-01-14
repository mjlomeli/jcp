require 'json'
require 'controller_helper_functions'
require 'controller_helper_products'

class Api::ProductsController < ApplicationController

  def show
    @query = {product_ids: [params[:id]]}
    @product = Product.find_by(id: params[:id])
    if !@product
      render json: product_locate_error(@query), status: 400
    else
      render json: to_products_json(products: [@product])
    end
  end

  def create
    @product = Product.create(product_params)
    if @product.save
      render json: to_products_json(products: [@product])
    else
      render json: product_error(product: @product), status: 401
    end
  end

  def update
    @query = {product_ids: [params[:id]]}
    @product = Product.find_by(id: params[:id])
    if !@product
      render json: product_locate_error(@query), status: 400
    else
      if @product.update_attributes(product_params)
        render json: to_products_json(products: [@product])
      else
        render json: product_error(product: @product), status: 401
      end
    end
  end

  def destroy
    @query = {product_ids: [params[:id]]}
    @product = Product.find_by(id: params[:id])
    if !@product
      render json: product_locate_error(@query), status: 400
    else
      if @products.destroy
        render json: to_products_json(products: [@product])
      else
        render json: product_error(product: @product), status: 401
      end
    end
  end

  def query
    @query = query_params
    @filter = product_filters
    begin
      puts @query
      puts @filter
      @products = Product.where(groups_from_params(@query)).where(@filter).custom_query(**@query)
      if @products.empty?
        render json: ["No search results with filters: #{@filter} nor with the query: #{@query}"], status: 400
      else
        images = []
        reviews = {}
        @products.each do |product|
          images.concat(product.images_resized("all"))
          prod_reviews = product.reviews
          reviews[product.id] = prod_reviews.map{|review| [review.user_id, review]}.to_h unless prod_reviews.empty?
        end
        render json: to_products_json(products: @products,  images: images, reviews: reviews, query: @query)
      end
    rescue => e
      puts e.to_s
      render json: { @query.keys.to_s => ["Can't use product indexing with the given filters: #{@filter} nor with the query: #{@query}"] }, status: 400
    end
  end

  def price_range
    @query = query_params
    price_min = @query[:price_min]
    price_max = @query[:price_max]
    search = []
    search << "products.price >= #{price_min}" if price_min
    search << "products.price <= #{price_max}" if price_max
    @products = Product.where(search.join(" and ")).custom_query(**@query)
    render json: to_products_json(products: @products)
  end

  def listings
    @query = query_params
    dimension = @query[:dimension]
    product_ids = @query[:product_ids] || []
    if @query[:product_ids] and !valid_dimension?(@query) and dimension != nil and dimension != "all"
      render json: product_ids.map { |id| [id, ["Could not find products with dimension: #{dimension}"]] }.to_h
    else
      @products = product_ids.empty? ? Product.custom_query(**@query) : products_from_params(@query).custom_query(**@query)
      if @products.empty?
        render json: product_locate_error(**@query), status: 400
      else
        error_ids = product_ids.to_set.clone
        images = []
        reviews = {}
        @products.each do |product|
          images.concat(product.images_resized(dimension || "all"))
          prod_reviews = product.reviews
          reviews[product.id] = prod_reviews.map{|review| [review.user_id, review]}.to_h unless prod_reviews.empty?
          error_ids.delete(product.id.to_i)
        end
        render json: to_products_json(products: @products, images: images, reviews: reviews, error_ids: error_ids)
      end
    end
  end

  def popular
    @query = query_params
    default = { views: :desc, num_favorers: :desc, price: :desc }
    gradient = {}
    @query.each do |k, v|
      case v
      when "false"
        gradient[k.to_sym] = :asc
      when "true"
        gradient[k.to_sym] = :desc
      end
    end
    @products = gradient.empty? ? Product.order(**default).custom_query(**@query) : Product.order(**gradient).custom_query(**@query)
    render json: to_products_json(products: @products)
  end

  def from_users
    @query = query_params
    users = users_from_params(@query)
    @products = Product.where(user_id: users).custom_query(**@query)
    if @products.empty?
      render json: ["Could not find products with user_ids: #{@query[:user_ids]}"], status: 400
    else
      render json: to_products_json(products: @products)
    end
  end

  def from_groups
    @query = query_params
    @products = groups_from_params(@query)
    if @products.empty?
      render json: ["Could not find products with {tags: #{@query[:tags]}, materials: #{@query[:materials]}, taxonomy_path: #{@query[:taxonomy_path]}}"], status: 400
    else
      render json: to_products_json(products: @products)
    end
  end

  def from_shops
    @query = query_params
    shops = shops_from_params(@query)
    @products = Product.where(shop_id: shops).custom_query(**@query)
    if shops.empty?
      render json: ["Could not find products with shop_ids: #{@query[:shop_ids]}"], status: 400
    else
      render json: to_products_json(products: @products)
    end
  end

  def destroys
    @query = query_params
    @products = products_from_params(@query)
    if !@products or @products.empty?
      render json: product_locate_error(**@query), status: 400
    else
      success_ids = []
      err_products = []
      @products.each { |prod| prod.destroy ? success_ids << prod.id : err_products << prod }
      err_ids = @query[:product_ids].reject { |query_prod_id| success_ids.include?(query_prod_id) }
      locate_errors = product_locate_error(product_ids: err_ids)
      delete_errors = product_error(products: err_products)
      render json: {
        product_ids: success_ids,
        errors: locate_errors.merge(delete_errors)
      }
    end
  end

  private

  def query_params(body_params=params, **kwargs)
    query = body_params.reject { |k, v| %w[format controller action].include?(k) }
    args = []
    query.each do |k, v|
      if %w[start finish limit views num_favorers page_number results_per_page].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Integer.new.cast(v)])
      elsif %w[price_min price_max].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[random views_lowest views_highest].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Boolean.new.cast(!!v ? v : false)])
      elsif %w[tags materials taxonomy_paths].include?(k)
        args.push([k.to_sym, to_array(v)])
      elsif %w[tag material taxonomy_path].include?(k)
        args.push(["#{k}s".to_sym, [v]])

      elsif %w[product_ids shop_ids user_ids].include?(k)
        ids = to_array(v).map { |value| ActiveModel::Type::Integer.new.cast(value) }
        args.push([k.to_sym, ids])
      elsif %w[shop_id user_id product_id].include?(k)
        args.push(["#{k}s".to_sym, [ActiveModel::Type::Integer.new.cast(v)]])
      elsif %w[id].include?(k)
        args.push(['product_ids'.to_sym, [ActiveModel::Type::Integer.new.cast(v)]])
      elsif k == 'ids'
        ids = to_array(v).map { |value| ActiveModel::Type::Integer.new.cast(value) }
        args.push(['product_ids'.to_sym, ids])
      else
        args.push([k.to_sym, v])
      end
    end
    args.to_h
  end

  def product_params(new_params=params, **kwargs)
    # the .require makes it so that when a controller is using the
    # product_params function, if product_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    new_params.permit(:user_id, :shop_id, :title, :price, :quantity, :views, :num_favorers,
                  :description, :image_urls, :category, :tags, :materials, :taxonomy_path)
  end

  def product_filters
    query = query_params
    filter = product_params(query)
    filter[:id] = query[:product_ids] if query.key?(:product_ids)
    [:tags, :materials, :taxonomy_path].each{|v| filter.delete(v)}
    filter
  end
end