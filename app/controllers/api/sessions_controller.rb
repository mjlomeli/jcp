class Api::SessionsController < ApplicationController
  def create
    # Find user by credentials
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user.nil?
      render json: ['Nope. Wrong credentials!'], status: 401
    else
      login!(@user)
      render 'api/users/show';
    end
  end

  def destroy
    @user = current_user
    logout!
    if !@user
      render json: { message: 'Logout successful.' }
    else
      if @user.email == "demo@email.com"
        render json: { demo: 'Thank you for demoing my website!', referenceId: Integer(@user.id) }
      else
        name = (@user.first_name or @user.email)
        render json: { message: "You've successfully logged out #{name}. See you later!"}
      end
    end
  end
end
