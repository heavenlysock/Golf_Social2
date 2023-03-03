class UsersController < ApplicationController
    skip_before_action :authenticated_user, only: [:create]
    # before_action :authorize, only: [:update, :destroy]


    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, status: :ok
    end

    def index
        render json: User.all, status: :ok
    end


    def update
        updated_user = User.find(params[:id])
        updated_user.update!(user_params)
        render json: updated_user, status: :accepted
    end

    def destroy
        render json: User.find(params[:id]).destroy!
        head :no_content
    end



    private

    def user_params
        params.permit(:name, :password, :image, :email)
    end
end
