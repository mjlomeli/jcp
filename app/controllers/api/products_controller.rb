require 'json'
require 'controller_helper_functions'
require 'controller_helper_products'

class Api::ProductsController < ApplicationController
  def index
    @query = query_params
    @condition = index_condition
    case @condition
    when RANGE
      fetch_product_range
    when PRICE_RANGE
      fetch_price_range
    when PRODUCT
      fetch_product
    when PRODUCTS
      fetch_products
    when VIEWS_RANGE
      fetch_views_range
    when USER_PRODUCTS
      fetch_user_products
    when GROUP_PRODUCTS
      fetch_group_products
    when GROUPS_PRODUCTS
      fetch_groups_products
    when SHOP_PRODUCTS
      fetch_shop_products
    else
      if !@query.empty?
        @product = Product.where(**@query)
        render json: @product
      else
        render json: ["Could not use product indexing with given params: #{@query}"], status: 400
      end
    end
  end

  def show
    @product = product_from_params
    if @product
      render json: @product
    else
      render json: ["Could not locate product id: #{params[:id]}"], status: 400
    end
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  def update
    #TODO: Test using web html
    @product = product_from_params
    if @product && @product.update_attributes(product_params)
      render :show
    elsif !@product
      render json: ["Could not locate product id: #{params[:id]}"], status: 400
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  def destroy
    @product = product_from_params
    if @product && @product.destroy
      render :show
    elsif !@product
      render json: ["Could not locate product id: #{params[:id]}"], status: 400
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  private
  RANGE = "RANGE"
  PRICE_RANGE = "PRICE_RANGE"
  PRODUCT = "PRODUCT"
  PRODUCTS = "PRODUCTS"
  VIEWS_RANGE = "VIEWS_RANGE"
  USER_PRODUCTS = "USER_PRODUCTS"
  GROUP_PRODUCTS = "GROUP_PRODUCTS"
  GROUPS_PRODUCTS = "GROUPS_PRODUCTS"
  SHOP_PRODUCTS = "SHOP_PRODUCTS"

  def index_condition
    case @query.keys().to_set.hash
    when Set[:user_id].hash
      condition = USER_PRODUCTS
    when Set[:product_id].hash, Set[:id].hash
      condition = PRODUCT
    when Set[:product_ids].hash, Set[:ids].hash
      condition = PRODUCTS
    when Set[:tag].hash, Set[:material].hash, Set[:taxonomy_path].hash, Set[:tag, :material].hash, Set[:tag, :material, :taxonomy_path].hash, Set[:tag, :taxonomy_path].hash
      condition = GROUP_PRODUCTS
    when Set[:tags].hash, Set[:materials].hash, Set[:taxonomy_paths].hash, Set[:tags, :materials].hash, Set[:tags, :materials, :taxonomy_paths].hash, Set[:tags, :taxonomy_paths].hash
      condition = GROUPS_PRODUCTS
    when Set[:shop_id].hash
      condition = SHOP_PRODUCTS
    when Set[:price_min, :price_max].hash
      condition = PRICE_RANGE
    when Set[:views_lowest].hash, Set[:views_highest].hash
      condition = VIEWS_RANGE
    when Set[:start, :end].hash, Set[:limit].hash, Set[:start, :limit].hash, Set[:limit, :random].hash, Set[:end].hash
      condition = RANGE
    else
      puts "Error: #{@query.keys().to_set} doesn't have a matching condition"
      condition = nil
    end
    condition
  end

  def query_params
    query = params.permit(:id, :ids, :product_id, :product_ids, :shop_id, :shop_ids,
                          :user_id, :start, :end, :random, :limit, :tag, :material, :taxonomy_path,
                          :tags, :materials, :taxonomy_paths, :price_min, :price_max,
                          :views_lowest, :views_highest)
    args = []
    query.each do |k, v|
      if %w[product_id shop_id user_id price_min price_max].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[start end random limit].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Integer.new.cast(v)])
      elsif %w[tag taxonomy_path material].include?(k)
        args.push([k.to_sym, v])
      elsif %w[random views_lowest views_highest].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Boolean.new.cast(!!v ? v : false)])
      elsif k == 'ids'
        args.push(['product_ids'.to_sym, to_array(v)])
      elsif k == 'id'
        args.push(['product_id'.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[product_ids shop_ids tags materials taxonomy_paths].include?(k)
        args.push([k.to_sym, to_array(v)])
      end
    end
    args.to_h
  end

  def product_params
    # the .require makes it so that when a controller is using the
    # product_params function, if product_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    params.require(:product)
          .permit(:title, :price, :quantity, :views, :num_favorers,
                  :description, :image_urls, :category, :tags, :user_id,
                  :shop_id, :random, :format)
  end
end


