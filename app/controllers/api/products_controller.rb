require 'json'

class Api::ProductsController < ApplicationController
  def index
    args = params.permit(:start, :end, :random)
    if !args.empty?
      if params[:random]
        @product = find_in_random_batches(args[:start], args[:end])
      else
        @products = find_in_batches(args[:start], args[:end])
      end
    else
      @products = Product.all
    end
      render json: @product
  end

  def show
    @product = Product.find_by(id: params[:id])
    if @product
      render json: @product
    else
      render json: ["Could not locate product_template id: #{params[:id]}"], status: 400
    end
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render :show
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  def update
    @product = Product.find_by(id: params[:id])
    if @product && @product.update_attributes(product_params)
      render :show
    elsif !@product
      render json: ["Could not locate product_template id: #{params[:id]}"], status: 400
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  def destroy
    @product = Product.find_by(id: params[:id])
    if @product && @product.destroy
      render :show
    elsif !@product
      render json: ["Could not locate product_template id: #{params[:id]}"], status: 400
    else
      render json: @product.errors.full_messages, status: 401
    end
  end

  private

  def product_params
    # the .require makes it so that when a controller is using the
    # product_params function, if product_template doesn't exist in the body_template
    # provided by a form, then the controller will not continue
    params.require(:product)
          .permit(:title, :price, :quantity, :views, :num_favorers,
                  :description, :image_urls, :category, :tags, :user_id,
                  :store_id, :random)
  end

  def find_in_batches(start, finish, batch_size = 25)
    enu = Product.find_in_batches(start: start, finish: finish, batch_size: batch_size)
    enu.reduce(:concat)
  end

  def find_in_random_batches(start, finish)
    puts "entered"
    randoms = []
    while randoms.length < finish.to_i - start.to_i
      offset = rand(Product.count)
      randoms.append(Product.offset(offset).first)
    end
    randoms
  end
end


