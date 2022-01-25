require 'controller_helper_functions'
require 'controller_helper_images'

class Api::CartItemsController < ApplicationController
  def index
    # GET /api/cart_items
    @user = current_user
    if !@user
      render json: ["User is not authorized"], status: 400
    else
      @cart = CartItem.where(user_id: @user.id)
      if @cart
        render json: @cart.map{|item| [item.product_id, item]}.to_h
      else !@cart
        render json: ["Could not locate cart items by user id: #{@user.id}"], status: 400
      end
    end
  end

  def create
    # POST /api/cart_items
    @user = current_user
    if !@user
      render json: ["User is not authorized"], status: 400
    else
      @cart = CartItem.new(cart_item_params)
      @cart.user_id = @user.id
      if @cart.save
        render json: {@cart.product_id => @cart}
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  def update
    # PATCH /api/cart_item
    @user = current_user
    if !@user
      render json: ["User is not authorized"], status: 400
    else
      @cart = CartItem.find_by(user_id: @user.id, product_id: params[:product_id])
      if !@cart
        render json: ["Could not locate cart item id: #{params[:id]}"], status: 400
      elsif @cart.user_id != @user.id
        render json: ["User is not authorized"], status: 400
      elsif @cart.update_attributes(cart_item_params)
        render json: {@cart.product_id => @cart}
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  def destroy
    # DELETE /api/cart_item
    puts "\nEntered 'destroy'\n"
    @user = user_from_params
    if !@user
      render json: ["User is not authorized"], status: 400
    else
      product_id = cart_item_params["product_id"]
      @cart = CartItem.find_by(product_id: product_id, user_id: @user.id)
      if !@cart
        render json: ["Could not locate product id: #{params[:user_id]}"], status: 400
      elsif @cart.destroy
        render json: {@cart.product_id => @cart}
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  private

  def user_from_params
    user_id = Integer(params[:user_id]) rescue Integer(params["user_id"]) rescue nil #converts to integer on fail set to nil
    return nil unless !!user_id
    User.find_by(id: user_id)
  end

  def cart_item_params(new_params=params, **kwargs)
    new_params.permit(:product_id, :quantity, :user_id)
  end
end
