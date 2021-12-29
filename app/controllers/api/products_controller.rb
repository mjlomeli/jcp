require 'json'

class Api::ProductsController < ApplicationController
  def index
    query_args = query_params
    if !query_args.empty?
      #TODO: Search by query
      @product = Product.first
    else
      range_args = range_params
      @product = product_range(**range_args)
    end
    render json: @product
  end

  def show
    @product = Product.find_by(id: params[:id])
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
    @product = Product.find_by(id: params[:id])
    if @product && @product.update_attributes(product_params)
      render :show
    elsif !@product
      render json: ["Could not locate product id: #{params[:id]}"], status: 400
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  def destroy
    @product = Product.find_by(id: params[:id])
    if @product && @product.destroy
      render :show
    elsif !@product
      render json: ["Could not locate product id: #{params[:id]}"], status: 400
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  private

  def range_params
    args = params.permit(:start, :finish, :random, :limit, :format)

    random = ActiveModel::Type::Boolean.new.cast(!!args[:random] ? args[:random] : false)
    start = ActiveModel::Type::Integer.new.cast(args[:start])
    finish = ActiveModel::Type::Integer.new.cast(args[:finish])
    limit = ActiveModel::Type::Integer.new.cast(args[:limit])

    start = !!start ? start.to_i : 0
    finish = !!finish ? finish.to_i : Product.count
    limit = !!limit ? limit.to_i : finish - start

    { start: start, finish: finish, limit: limit, random: random }
  end

  def query_params
    args = []
    params.permit(:id, :dimension, :group_name, :group_id, :format).each do |k, v|
      if ['id', 'group_id'].include?(k)
        args.push([k, ActiveModel::Type::Decimal.new.cast(v)])
      elsif ['group_name', 'dimension'].include?(k)
        args.push([k, ActiveModel::Type::String.new.cast(v)])
      elsif ['query'].include?(k)
        args.push([k, ActiveModel::Type::String.new.cast(v)])
      elsif ['tags', 'sku', 'materials', 'taxonomy'].include?(k)
        string_array = ActiveModel::Type::String.new.cast(v)
        args.push([k, JSON.parse(string_array)])
      end
    end
    args.to_h
  end

  def product_params
    # the .require makes it so that when a controller is using the
    # product_params function, if product_template doesn't exist in the body_template
    # provided by a form, then the controller will not continue
    params.require(:product)
          .permit(:title, :price, :quantity, :views, :num_favorers,
                  :description, :image_urls, :category, :tags, :user_id,
                  :shop_id, :random, :format)
  end

  def product_range(start: nil, finish: nil, limit: nil, random: false)
    products = Product.offset(start).limit(finish - start)
    if random
      randoms = []
      while randoms.length < limit
        offset = rand(products.count)
        randoms.append(products.offset(offset).first)
      end
      randoms
    else
      products.limit(limit)
    end
  end
end


