class FriendshipsController < ApplicationController
    def index
      friendships = @current_user.received_friendships_requests
      render json: friendships, status: :ok
    end
  
    def show
      friendship = Friendship.find(params[:id])
      render json: friendship, status: :ok
    end
  
    def create
      params[:sender_id] = session[:user_id]
      Friendship.find_or_create_by!(friendship_params)
      render json: User.find(session[:user_id]), status: :created
    end
  
    def update
      friendship = Friendship.find(params[:id])
      if friendship.recipient.id == session[:user_id] || friendship.sender.id == session[:user_id]
        friendship.update!(status: "accepted")
        render json: friendship, status: :accepted
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  
    def destroy
      friendships = Friendship.where(sender_id: session[:user_id], recipient_id: params[:recipient_id], status: "accepted").or(Friendship.where(recipient_id: session[:user_id], sender_id: params[:recipient_id], status: "accepted"))
      if friendships.length > 0 && friendships[0].recipient.id == session[:user_id] || friendships[0].sender.id == session[:user_id]
        friendships.destroy_all
        head :no_content
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
    end
end
  
    private
  
    def friendship_params
      params.permit(:sender_id, :recipient_id)
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