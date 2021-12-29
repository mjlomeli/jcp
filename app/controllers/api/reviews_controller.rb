class Api::ReviewsController < ApplicationController
  def index
    #TODO: test if this works
    # GET /api/users/:user_id/reviews
    # GET /api/products/:product_id/reviews
    @user = user_from_params
    @review = review_from_params
    @product = product_from_params
    if @user
      render json: @user.reviews
    elsif @product
      render json: @product.reviews
    else
      render json: ["Could not locate user id: #{params[:user_id]}"], status: 400
    end
  end

  def create
    # POST /api/products/:product_id/reviews
    @user = user_from_params
    if !@user or @user.id != current_user.id
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @review = Review.new(review_params)
      if @review.save
        render json: @review
      else
        render json: @review.errors.full_messages, status: 401
      end
    end
  end

  def update
    # PATCH /api/products/:product_id/reviews/:review_id
    @user = user_from_params
    if !@user or @user.id != current_user.id
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @review = Review.find_by(product_id: params[:product_id])
      if @review && @review.update_attributes(review_params)
        render json: @review
      elsif !@review
        render json: ["Could not locate product id: #{params[:product_id]}"], status: 400
      else
        render json: @review.errors.full_messages, status: 401
      end
    end
  end

  def destroy
    # DELETE /api/products/:product_id/reviews/:review_id
    @user = user_from_params
    if !@user or @user.id != current_user.id
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    else
      @review = Review.find_by(product_id: params[:product_id])
      if @review.destroy
        render json: @review
      elsif !@review
        render json: ["Could not locate product id: #{params[:product_id]}"], status: 400
      else
        render json: @review.errors.full_messages, status: 401
      end
    end
  end

  private
  def review_from_params
    review_id = Integer(params[:review_id]) rescue nil #converts to integer on fail set to nil
    return nil unless !!review_id
    Review.find_by(id: params[:review_id])
  end

  def product_from_params
    product_id = Integer(params[:product_id]) rescue nil #converts to integer on fail set to nil
    return nil unless !!product_id
    Product.find_by(id: params[:product_id])
  end

  def user_from_params
    user_id = Integer(params[:user_id]) rescue nil #converts to integer on fail set to nil
    return nil unless !!user_id
    User.find_by(id: params[:user_id])
  end

  def review_params
    params.require(:review).permit(:product_id, :user_id, :rating, :comment)
  end
end
