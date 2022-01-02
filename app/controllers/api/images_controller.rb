require 'json'
require 'set'
require 'controller_helper_functions'
require 'controller_helper_images'

class Api::ImagesController < ApplicationController
  def index
    @query = query_params
    @condition = index_condition
    puts @query

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
          puts e
        end
      else
        render json: ["Could not use image indexing with given params: #{@query}"], status: 400
      end
    end
  end

  def show
    @image = image_from_params
    if @image
      render json: @image
    else
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    end
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render :show
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  def update
    @image = image_from_params
    if @image && @image.update_attributes(image_params)
      render :show
    elsif !@image
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    else
      render json: @image.errors.full_messages, status: 401
    end
  end

  def destroy
    @image = image_from_params
    if @image && @image.destroy
      render :show
    elsif !@image
      render json: ["Could not locate image id: #{params[:id]}"], status: 400
    else
      render json: @image.errors.full_messages, status: 401
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

  def query_params
    query = params.permit(:id, :ids, :image_id, :product_id,
                          :product_ids, :shop_id, :shop_ids, :user_id, :dimension, :group_name,
                          :group_id, :group_ids, :image_ids)
    args = []
    query.each do |k, v|
      if %w[image_id product_id shop_id user_id group_id].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[dimension group_name].include?(k)
        args.push([k.to_sym, ActiveModel::Type::String.new.cast(v)])
      elsif k == 'id'
        args.push(['image_id'.to_sym, ActiveModel::Type::Decimal.new.cast(v)])
      elsif %w[image_ids product_ids shop_ids group_ids].include?(k)
        args.push([k.to_sym, to_array(v)])
      elsif k == 'ids'
        args.push(['image_ids'.to_sym, to_array(v)])
      end
    end
    args.to_h
  end

  def image_params
    # the .require makes it so that when a controller is using the
    # image_params function, if image_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    params.require(:image)
          .permit(:data, :mimetype, :size, :url, :encoding, :name, :group_name,
                  :group_id, :dimension, :created_at, :updated_at)
  end

end
