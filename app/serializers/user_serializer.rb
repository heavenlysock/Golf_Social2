class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :accepted_friends, :pending_received_friendships_requests
  has_many :sent_friendships_requests
  has_many :received_friendships_requests



  def pending_received_friendships_requests
    self.object.received_friendships_requests.pending.map{|f|  {id: f.id, status: f.status, sender: f.sender, recipient: f.recipient}}
  end
  
  def accepted_received_friendship_requests
    self.object.received_friendships_requests.accepted
  end

end
