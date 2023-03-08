class FriendshipsController < ApplicationController
    def create
      render json: Friendship.create!(friendship_params), status: 201
    end
  
    def destroy
      friend = Friendship.find(params[:id])
      if friend.recipient == @current_user || friend.sender == @current_user
        friend.update(status: "rejected")
      end
      render json: friend, status: 202
    end
  
    private
  
    def friendship_params
      params.require(:friendship).permit(:sender_id, :recipient_id, :status)
    end
  end