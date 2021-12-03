class Api::ReviewsController < ApplicationController
  def index
    # GET /api/users/:user_id/reviews
    # GET /api/products/:product_id/reviews
    @user = User.find_by(params[:user_id])
    @product = Product.find_by(params[:product_id])
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
    @user = User.find_by(user_id: params[:user_id])
    if !@user or @user.id != current_user.id
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    end

    @review = Review.new(review_params)
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: 401
    end
  end

  def update
    # PATCH /api/products/:product_id/reviews/:review_id
    @user = User.find_by(user_id: params[:user_id])
    if !@user or @user.id != current_user.id
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    end

    @review = Review.find_by(product_id: params[:product_id])
    if @review && @review.update_attributes(review_params)
      render json: @review
    elsif !@review
      render json: ["Could not locate product id: #{params[:product_id]}"], status: 400
    else
      render json: @review.errors.full_messages, status: 401
    end
  end

  def destroy
    # DELETE /api/products/:product_id/reviews/:review_id
    @user = User.find_by(user_id: params[:user_id])
    if !@user or @user.id != current_user.id
      render json: ["User id: #{params[:user_id]} is not authorized"], status: 400
    end

    @review = Review.find_by(product_id: params[:product_id])
    if @review.destroy
      render json: @review
    elsif !@review
      render json: ["Could not locate product id: #{params[:product_id]}"], status: 400
    else
      render json: @review.errors.full_messages, status: 401
    end
  end

  private
  def review_params
    params.require(:review).permit(:product_id, :user_id, :rating, :comment)
  end
end
