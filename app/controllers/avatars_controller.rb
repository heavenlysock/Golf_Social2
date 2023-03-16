class AvatarsController < ApplicationController
    require 'mini_magick'
    require 'image_processing/mini_magick'
    def index
        render json: Avatar.all
    end

    def create
       
        avatar = Avatar.create(avatar_params)

        render json: avatar, status: :created
    end
    # def create
    #     avatar = Avatar.new(avatar_params)
    #     avatar.img.attach(params[:img])
    #     avatar.save
    #     render json: avatar
    # end

    def show
        avater = Avatar.find(params[:id])

        render json: avatar
    end

    def update
        user = User.find(session[:user_id])
        avatar = user.avatar
    
        avatar.img.attach(params[:img])
    
        render json: user, status: :accepted
      end


    private
    def avatar_params
        params.permit(:img, :user_id)
    end
end
