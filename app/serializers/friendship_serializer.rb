class FriendshipSerializer < ActiveModel::Serializer
  attributes :id, :status
  has_one :sender
  has_one :recipient
end
