class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :invalid
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  before_action :authenticated_user


  def authenticated_user
    @current_user ||= User.find_by(id: session[:user_id])
    render json: { errors: "Not authorized" }, status: :unauthorized unless @current_user
  end

  private

  def invalid(invalid)
      render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def not_found
    render json: { error: "User not found" }, status: :not_found
  end
end
