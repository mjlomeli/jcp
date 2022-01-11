require 'json'
require 'set'
require 'controller_helper_functions'
require 'controller_helper_images'

class Api::ImagesController < ApplicationController
  def show
    @query = { image_ids: [params[:id]] }
    @image = Image.find_by(id: params[:id])
    if !@image
      render json: image_locate_error(@query), status: 400
    else
      render json: to_images_json(images: [@image])
    end
  end

  def create
    @image = Image.create(image_params)
    if @image.save
      render json: to_images_json(images: [@image])
    else
      render json: image_error(image: @image), status: 400
    end
  end

  def update
    @query = { image_ids: [params[:id]] }
    @image = Image.find_by(id: params[:id])
    if !@image
      render json: image_locate_error(@query), status: 400
    else
      if @image.update_attributes(image_params)
        render json: to_images_json(images: [@image])
      else
        render json: image_error(image: @image), status: 401
      end
    end
  end

  def destroy
    @query = { image_ids: [params[:id]] }
    @image = Image.find_by(id: params[:id])
    if !@image
      render json: image_locate_error(@query), status: 400
    else
      if @image.destroy
        render json: to_images_json(images: [@image])
      else
        render json: image_error(image: @image), status: 401
      end
    end
  end

  def query
    # groups: :group_name, :group_id, :dimension,
    @query = query_params
    @filter = image_filters
    begin
      @images = Image.where(@filter).custom_query(**@query)
      if @images.empty?
        render json: ["No search results with filters: #{@filter} nor with the query: #{@query}"], status: 400
      else
        render json: to_images_json(images: @images)
      end
    rescue => e
      puts e.to_s
      render json: { @query.keys.to_s => ["Can't use image indexing with the given filters: #{@filter} nor with the query: #{@query}"] }, status: 400
    end
  end

  def from_products
    @query = query_params
    @products = products_from_params(@query).custom_query(**@query)
    if !@products || @products.empty?
      render json: ["Could not find images with product_ids: #{@query[:product_ids]}"], status: 400
    else
      @filter = image_filters
      @images = @products.reduce([]){|arr, product| arr + product.filtered_images(filter: @filter)}
      render json: to_images_json(images: @images)
    end
  end

  def from_users
    @query = query_params
    @users = users_from_params(@query).custom_query(**@query)
    if !@users || @users.empty?
      render json: ["Could not find images with user_ids: #{@query[:users_ids]}"], status: 400
    else
      @filter = image_filters
      @images = @users.reduce([]){|arr, user| arr + user.filtered_images(filter: @filter)}
      render json: to_images_json(images: @images)
    end
  end

  def from_shops
    @query = query_params
    @shops = shops_from_params(@query).custom_query(@query)
    if !@shops || @shops.empty?
      render json: ["Could not find images with shop_ids: #{@query[:shop_ids]}"], status: 400
    else
      @filter = image_filters
      @images = @shops.reduce([]){|arr, shop| arr + shop.filtered_images(filter: @filter)}
      render json: to_images_json(images: @images)
    end
  end

  def listings
    @query = query_params
    @filter = image_filters
    @images = Image.where(group_name: 'product', **@filter).custom_query(**@query)
    if !@images || @images.empty?
      render json: image_locate_error(**@query), status: 400
    else
      group_ids = @query[:group_ids].map(&:to_i).to_set
      success_ids = @images.reduce([]){|arr, img| arr << img.group_id}.to_set
      error_ids = group_ids.subtract(success_ids)
      render json: to_images_json(images: @images, group_ids: error_ids)
    end
  end

  private

  def query_params(body_params=params, **kwargs)
    query = body_params.reject { |k, v| %w[format controller action].include?(k) }
    args = []
    query.each do |k, v|
      if %w[dimension group_name].include?(k)
        args.push([k.to_sym, ActiveModel::Type::String.new.cast(v)])
      elsif %w[results_per_page page_number start finish limit].include?(k)
        args.push([k.to_sym, ActiveModel::Type::Integer.new.cast(v)])
      elsif %w[image_ids group_ids shop_ids user_ids product_ids].include?(k)
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

  def image_params(new_params=params, **kwargs)
    # the .require makes it so that when a controller is using the
    # image_params function, if image_template doesn't exist in the home_body_template
    # provided by a form, then the controller will not continue
    new_params.permit(:data, :mimetype, :size, :url, :encoding, :name, :group_name,
                      :group_id, :dimension)
  end

  def image_filters
    query = query_params
    filter = image_params(query)
    filter[:id] = query[:image_ids] if query.key?(:image_ids)
    filter[:group_id] = query[:group_ids] if query.key?(:group_ids)
    filter
  end
end
