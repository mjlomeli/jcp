class Api::CartItemsController < ApplicationController
  def index
    # GET /api/users/:user_id/cart_items
    @user = user_from_params
    if !user_from_params
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @cart = CartItem.find_by(user_id: params[:user_id])
      if @cart
        render json: @cart
      elsif !@cart
        render json: ["Could not locate cart items by user id: #{params[:user_id]}"], status: 400
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  def create
    # POST /api/users/:user_id/cart_items
    @user = user_from_params
    if !@user
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @cart = CartItem.new(cart_item_params)
      @cart.user_id = params[:user_id]
      if @cart.save
        render json: @cart
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  def update
    # PATCH /api/users/:user_id/cart_items/:cart_item_id
    @user = user_from_params
    if !@user
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @cart = CartItem.find_by(user_id: params[:user_id])
      if @cart && @cart.update_attributes(review_params)
        render json: @cart
      elsif !@cart
        render json: ["Could not locate product id: #{params[:user_id]}"], status: 400
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  def destroy
    # DELETE /api/users/:user_id/cart_items/:cart_item_id
    if !@user
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @cart = CartItem.find_by(user_id: params[:user_id])
      if @cart.destroy
        render json: @cart
      elsif !@cart
        render json: ["Could not locate product id: #{params[:user_id]}"], status: 400
      else
        render json: @cart.errors.full_messages, status: 401
      end
    end
  end

  private

  def user_from_params
    user_id = Integer(params[:user_id]) rescue nil #converts to integer on fail set to nil
    return nil unless !!user_id

    user = User.find_by(id: params[:user_id])
    return nil unless !!user

    if user.id != current_user.id
      nil
    else
      user
    end
  end

  def cart_item_params
    params.require(:cart_item).permit(:product_id, :quantity, :user_id)
  end
end
