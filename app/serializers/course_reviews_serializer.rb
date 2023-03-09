class CourseReviewsSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :name, :par, :description, :features, :img_url 

    has_many :reviews

    def total_reviews
        object.reviews.length
    end
    


end

