class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :rating, :favorite
  has_one :user
  has_one :course
end
