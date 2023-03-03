class CourseReviewsSerializer < ActiveModel::Serializer
    attributes :id, :name, :par, :description, :features, :img_url 

    has_many :reviews

    def total_reviews
        object.reviews.length
    end
    


end

