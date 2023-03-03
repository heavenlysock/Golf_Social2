class SessionsController < ApplicationController

    skip_before_action :authenticated_user, only: :create 
    # possibly not needed

    def create # login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok 
        else
            render json: { error: "Login credentials are incorrect" }, status: :unauthorized
        end 
    end

    def destroy # logout
        session.delete :user_id
        render json: { message: "Successfully logged out" }, status: 204
        head :no_content
    end

end
