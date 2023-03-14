class ReviewsController < ApplicationController
    # skip_before_action :authenticated_user, only: [:index, :show]
    before_action :find_review, only: [:update, :destroy, :show]
    # rescue_from ActiveRecord::RecordNotFound, with: :not_found
    # rescue_from ActiveRecord::RecordInvalid, with: :invalid

    def index
        render json: Review.all, status: :ok
    end

    def show
        render json: @review, status: :ok
    end

    def create
        # byebug
        newReview = @current_user.reviews.create!(review_params)
        render json: newReview, status: :created
    end

    def update
        @review.update!(review_params)
        render json: @review, status: :accepted
        
    
    end
    def destroy
        @review.destroy!
        head :no_content
    end

    private

    def review_params
        params.permit(:user_id, :course_id, :favorite, :comment, :rating)
    end

    def find_review
        @review = Review.find(params[:id])
    end

    

end







    
