class FriendshipsController < ApplicationController
    def index
      friendships = @current_user.friendships
      render json: friendships, status: :ok
    end
  
    def show
      friendship = Friendship.find(params[:id])
      render json: friendship, status: :ok
    end
  
    def create
      params[:sender_id] = @current_user.id
      friendship = Friendship.new(friendship_params)
      if friendship.save
        render json: friendship, status: :created
      else
        render json: { error: friendship.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      friendship = Friendship.find(params[:friend_id])
      if friendship.recipient == @current_user || friendship.sender == @current_user
        friendship.update(status: "accepted")
        render json: { friend: friendship }, status: :accepted
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def destroy
      friendship = Friendship.find(params[:friend_id])
      if friendship.recipient == @current_user || friendship.sender == @current_user
        friendship.destroy
        render json: { message: "Friendship destroyed" }, status: :ok
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
    end
end
  
    private
  
    def friendship_params
      params.permit(:sender_id, :recipient_id, :status)
    end
  end



# class FriendshipsController < ApplicationController
#     def index
#         friendships = @current_user.sent_friendships_requests + @current_user.received_friendships_requests
#         render json: friendships, status: :ok
#     end
    
#     def show
#         friendship = Friendship.find(params[:id])
#         render json: friendship, status: :ok
#     end

#     def create
#         params[:sender_id] = session[:user_id]
#         render json: Friendship.create!(friendship_params), status: 201
#     end

#     def update
#         friend = Friendship.find(params[:id])
#         if friend.recipient == @test_user_mani|| friend.sender == @test_user_mani
#             friend.update!(status: "accepted")
#         end
#             render json: @test_user_mani, status: 202
#     end

#     def destroy
#         friendships = Friendship.where(sender: @current_user, recipient_id: params[:friend_id]).or(Friendship.where(recipient: @current_user, sender_id: params[:friend_id]))
#         friendships.each(&:destroy)
#         render json: @current_user, status: :ok
#     end
# end