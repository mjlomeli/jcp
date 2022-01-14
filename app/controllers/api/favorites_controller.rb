class Api::FavoritesController < ApplicationController
  def index
    #http://localhost:3000/api/favorite?user_id=2
    @user = user_from_params
    if !@user
      render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    elsif !!current_user and @user.id != current_user.id
      render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
    else
      render json: Favorite.where(user_id: @user.id).map{|fav| fav.product_id}
    end
  end

  def create
    #http://localhost:3000/api/favorite?product_id=0.1133353182e10&user_id=2
    @user = user_from_params
    # if !@user
    #   render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    # elsif @user.id != current_user.id
    #   render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
    # else
      @favorite = Favorite.create({user_id: params[:user_id], product_id: params[:product_id]})
      if @favorite.save
        render json: [@favorite.product_id]
      else
        render json: @favorite.errors.full_messages, status: 401
      end
    # end
  end

  def delete
    #http://localhost:3000/api/favorite?product_id=0.1133353182e10&user_id=2
    @user = user_from_params
    # if !@user
    #   render json: ["No valid user id was provided: {user_id: #{params[:user_id]}}"], status: 400
    # elsif @user.id != current_user.id
    #   render json: ["Unauthorized user(#{@user.id}) tried to access user(#{params[:user_id]})"], status: 400
    # else
      @favorite = Favorite.find_by({user_id: params[:user_id], product_id: params[:product_id]})
      if @favorite && @favorite.destroy
        render json: [@favorite.product_id]
      elsif !@favorite
        render json: ["Could not locate product id: #{params[:product_id]}"], status: 400
      else
        render json: @favorite.errors.full_messages, status: 401
      end
    # end
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
end
