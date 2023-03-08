class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :image, :friends
  has_many :sent_friendships_requests
  has_many :received_friendships_requests
end
