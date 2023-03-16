class CoursesController < ApplicationController
    # skip_before_action :authenticated_user, only: [:index, :show]

    # rescue_from ActiveRecord::RecordNotFound, with: :not_found
    # rescue_from ActiveRecord::RecordInvalid, with: :invalid



    def index
        render json: Course.all, status: :ok
    end

    def show
        render json: Course.find(params[:id]), status: :ok, serializer: CourseReviewsSerializer
    end

    def create
        byebug
        render json: @current_user.created_courses.create!(course_params), status: :created
    end

    def update
        render json: Course.find(params[:id]).update!(course_params), status: :accepted
    end




    private

    # def render_courses
    #     render json: Course.all, status: :ok
    # end

    def course_params
        params.permit(:user_id, :name, :par, :description, :features, :img_url)
    end

    def not_found
        render json: { error: "Course with ID #{params[:id]} not found" }, status: :not_found
    end
end