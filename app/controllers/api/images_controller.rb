require 'json'
require 'set'
require 'controller_helper_functions'
require 'controller_helper_images'
require 'controller_helper_products'

class Api::ImagesController < ApplicationController
  def show
    @query = { image_ids: [params[:id]] }
    @image = Image.find_by(id: params[:id])
    if !@image
      render json: image_locate_error(@query)
    else
      render json: to_images_json(images: [@image])
    end
  end

  def create
    @image = Image.create(image_params)
    if @image.save
      render json: to_images_json(images: [@image])
    else
      render json: image_error(image: @image)
    end
  end

  def update
    @query = { image_ids: [params[:id]] }
    @image = Image.find_by(id: params[:id])
    if !@image
      render json: image_locate_error(query)
    else
      if @image.update_attributes(image_params)
        render json: to_images_json(images: [@image])
      else
        render json: image_error(image: @image)
      end
    end
  end

  def destroy
    @query = { image_ids: [params[:id]] }
    @image = Image.find_by(id: params[:id])
    if !@image
      render json: image_locate_error(@query)
    else
      if @image.destroy
        render json: to_images_json(images: [@image])
      else
        render json: image_error(image: @image)
      end
    end
  end

  def query
    @query = query_params
    ids = [:image_ids, :group_ids]
    @search = @query.reject { |k, v| ids.include?(k) }.to_h
    @images = ids.any?{|k| @query.key?(k)} ? images_from_params(@query) : Image.all
    if @images.empty?
      render json: image_locate_error(**@query)
    else
      begin
        if @search.empty?
          render json: to_images_json(images: @images)
        else
          render json: to_images_json(images: @images.where(@search))
        end
      rescue => e
        render json: { @query.keys.to_s => ["Could not use image indexing with given params: #{@query.to_s}"] }, status: 400
      end
    end
  end

  def from_product
    @query = query_params(extract_product_ids(params))
    @product = Product.find_by(id: @query[:product_ids])
    if !@product
      render product_locate_error(product_ids: @query[:product_ids])
    else
      image_ids = @products.images.ids
      if @images.empty?
        render json: image_locate_error(image_ids: @product.image_ids)
      else
        render json: to_images_json(images: @images)
      end
    end
  end

  def from_products
    @query = { product_ids: [params[:id]] }
    @product = Product.find_by(id: params[:id])
    if !@product
      render json: ["Could not find images with product_ids: #{@query[:product_ids]}"], status: 400
    else
      render json: to_images_json(images: [@image])
    end
  end

  def from_user

  end

  def from_users

  end

  def from_shop

  end

  def from_shops

  end

  def from_groups

  end


  def index
    @query = query_params
    @condition = index_condition

    case @condition
    when USER_IMAGES
      fetch_user_images
    when IMAGE
      fetch_image
    when IMAGES
      fetch_images
    when PRODUCT_IMAGES
      fetch_product_images
    when PRODUCT_IMAGES_RESIZED
      fetch_product_images_resized
    when PRODUCTS_IMAGES
      fetch_products_images
    when PRODUCTS_IMAGES_RESIZED
      fetch_products_images_resized
    when GROUP_IMAGES
      fetch_group_images
    when GROUP_IMAGES_RESIZED
      fetch_group_images_resized
    when SHOP_IMAGES
      fetch_shop_images
    when SHOP_IMAGES_RESIZED
      fetch_shop_images_resized
    when SHOPS_IMAGES_RESIZED
      fetch_shops_images_resized
    else
      if !@query.empty?
        begin
          @images = Image.where(**@query)
          render json: @images
        rescue => e
          render json: ["Could not use image indexing with given params: #{@query}"], status: 400
        end
      else
        render json: ["Could not use image indexing with given params: #{@query}"], status: 400
      end
    end
  end

  private

  IMAGE = "IMAGE"
  IMAGES = "IMAGES"
  USER_IMAGES = "USER_IMAGES"
  PRODUCT_IMAGES = "PRODUCT_IMAGES"
  PRODUCT_IMAGES_RESIZED = "PRODUCT_IMAGES_RESIZED"
  PRODUCTS_IMAGES = "PRODUCTS_IMAGES"
  PRODUCTS_IMAGES_RESIZED = "PRODUCTS_IMAGES_RESIZED"
  GROUP_IMAGES = "GROUP_IMAGES"
  GROUP_IMAGES_RESIZED = "GROUP_IMAGES_RESIZED"
  SHOP_IMAGES = "SHOP_IMAGES"
  SHOP_IMAGES_RESIZED = "SHOP_IMAGES_RESIZED"
  SHOPS_IMAGES_RESIZED = "SHOPS_IMAGES_RESIZED"

  def index_condition
    set = @query.keys().to_set.hash
    case set
    when Set[:user_id].hash
      condition = USER_IMAGES
    when Set[:image_id].hash, Set[:id].hash
      condition = IMAGE
    when Set[:image_ids].hash, Set[:ids].hash
      condition = IMAGES
    when Set[:product_id].hash
      condition = PRODUCT_IMAGES
    when Set[:product_id, :dimension].hash
      condition = PRODUCT_IMAGES_RESIZED
    when Set[:product_ids].hash
      condition = PRODUCTS_IMAGES
    when Set[:product_ids, :dimension].hash
      condition = PRODUCTS_IMAGES_RESIZED
    when Set[:image_ids, :group_id, :group_name].hash, Set[:ids, :group_id, :group_name].hash, Set[:image_ids, :group_id].hash, Set[:ids, :group_id].hash
      condition = GROUP_IMAGES
    when Set[:image_ids, :group_id, :group_name, :dimension].hash, Set[:ids, :group_id, :group_name, :dimension].hash, Set[:image_ids, :group_id].hash, Set[:ids, :group_id].hash
      condition = GROUP_IMAGES_RESIZED
    when Set[:shop_id].hash
      condition = SHOP_IMAGES
    when Set[:shop_id, :dimension].hash
      condition = SHOP_IMAGES_RESIZED
    when Set[:shop_ids, :dimension].hash, Set[:shop_ids].hash
      condition = SHOPS_IMAGES_RESIZED
    else
      puts "Error: #{@query.keys().to_set} doesn't have a matching condition"
      condition = nil
    end
    condition
  end

  def query_params(new_params=params, **kwargs)
    query = new_params.reject { |k, v| %w[format controller action].include?(k) }
    args = []
    query.each do |k, v|
      if %w[dimension group_name].include?(k)
        args.push([k.to_sym, ActiveModel::Type::String.new.cast(v)])
      elsif %w[image_ids group_ids shop_ids user_ids].include?(k)
        ids = to_array(v).map { |value| ActiveModel::Type::Integer.new.cast(value) }
        args.push([k.to_sym, ids])
      elsif %w[image_id group_id shop_id user_id].include?(k)
        args.push(["#{k}s".to_sym, [ActiveModel::Type::Integer.new.cast(v)]])
      elsif %w[id].include?(k)
        args.push(['image_ids'.to_sym, [ActiveModel::Type::Integer.new.cast(v)]])
      elsif k == 'ids'
        ids = to_array(v).map { |value| ActiveModel::Type::Integer.new.cast(value) }
        args.push(['image_ids'.to_sym, ids])
      else
        args.push([k.to_sym, v])
      end
    end
    args.to_h
  end

  # def image_params
  #   # the .require makes it so that when a controller is using the
  #   # image_params function, if image_template doesn't exist in the home_body_template
  #   # provided by a form, then the controller will not continue
  #   params.require(:image)
  #         .permit(:data, :mimetype, :size, :url, :encoding, :name, :group_name,
  #                 :group_id, :dimension, :created_at, :updated_at)
  # end

  def image_params(new_params=params)
    # the .require makes it so that when a controller is using the
    # image_params function, if image_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    new_params.permit(:data, :mimetype, :size, :url, :encoding, :name, :group_name,
                  :group_id, :dimension, :created_at, :updated_at)
  end

end
