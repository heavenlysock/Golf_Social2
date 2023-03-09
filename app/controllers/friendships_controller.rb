class FriendshipsController < ApplicationController
    def index
        friendships = @current_user.sent_friendships_requests + @current_user.received_friendships_requests
        render json: friendships, status: :ok
    end
    
    def show
        friendship = Friendship.find(params[:id])
        render json: friendship, status: :ok
    end

    def create
        params[:sender_id] = session[:user_id]
        render json: Friendship.create!(friendship_params), status: 201
    end

    def update
        friend = Friendship.find(params[:id])
        if friend.receiver == @test_user_mani|| friend.sender == @test_user_mani
            friend.update!(status: "accepted")
        end
            render json: @test_user_mani, status: 202
    end

    def destroy
        friendships = Friendship.where(sender: @current_user, recipient_id: params[:friend_id]).or(Friendship.where(recipient: @current_user, sender_id: params[:friend_id]))
        friendships.each(&:destroy)
        render json: @current_user, status: :ok
    end
end