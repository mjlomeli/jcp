class Api::FavoritesController < ApplicationController
  def index
    @user = user_from_params
    if !@user
      render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    elsif !!current_user and @user.id != current_user.id
      render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
    else
      if params[:range]
        render json: favorite_range(params[:range])
      else
        render json: @user.favorites;
      end
    end
  end

  def show
    @user = user_from_params
    if !@user
      render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    elsif @user.id != current_user.id
      render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
    else
      @favorite = Favorite.find_by(user_id: @user.id, product_id: params[:product_id])
      if @favorite
        render json: @favorite
      else
        render json: @favorite.errors.full_messages, status: 401
      end
    end
  end

  def create
    @user = user_from_params
    if !@user
      render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    elsif @user.id != current_user.id
      render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
    else
      @favorite = Favorite(user_id: @user.id, product_id: params[:product_id])
      if @favorite.save
        render json: @favorite
      else
        render json: @favorite.errors.full_messages, status: 401
      end
    end
  end

  def delete
    # DELETE /api/favorites/:product_id
    @user = user_from_params
    if !@user
      render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    elsif @user.id != current_user.id
      render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
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
  def user_from_params
    user_id = Integer(params[:user_id]) rescue nil #converts to integer on fail set to nil
    return nil unless !!user_id
    User.find_by(id: params[:user_id])
  end

  def favorite_params
    params.require(:favorite).permit(:product_id)
  end

  def favorite_range(favorite_ids)
    Favorite.where(user_id: current_user.id, id: favorite_ids)
  end
end
