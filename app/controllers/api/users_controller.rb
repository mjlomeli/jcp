class Api::UsersController < ApplicationController
  def index
    args = params.permit(:start, :end)
    if !args.empty?
      @users = find_in_batches(args[:start], args[:end])
      render json: @users
    else
      @users = User.all
      render json: @users
    end
  end

  def show
    @user = selected_user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user && @user.update_attributes(user_params)
      render :show
    elsif !@user
      render json: ["Could not locate user id: #{params[:id]}"], status: 400
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end

  def find_in_batches(start, finish, batch_size=25)
    enu = User.find_in_batches(start: start, finish:finish, batch_size:batch_size)
    enu.reduce(:concat)
  end
end
