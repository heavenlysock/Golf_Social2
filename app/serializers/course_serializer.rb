class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :par, :description, :features, :img_url
  # has_one :user
end
