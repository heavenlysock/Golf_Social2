class UsersController < ApplicationController
    # skip_before_action :authenticated_user, only: [:create]
    #this4 
    # before_action :authorize, only: [:update, :destroy]


    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        user = find_user
        render json: user
    end

    def index
        render json: User.all, status: :ok
    end


    def update
        # updated_user = User.find(params[:id])
        updated_user.update!(user_params)
        render json: updated_user, status: :accepted
    end

    def destroy
        @current_user.destroy
        head :no_content
    end



    private

    def find_user
        user = User.find(params[:id])
    end

    def user_params
        params.permit(:name, :password, :img, :email, :avatar)
    end
end
