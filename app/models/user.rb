class User < ApplicationRecord
    has_many :reviews
    has_many :courses, through: :reviews
    has_many :courses, through: :created_courses
    has_many :created_courses, through: :updated_courses
    has_secure_password

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true



    has_many :sent_friendships_requests, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy
    # has_many :pending_sent_friendships_requests, -> {where("friendships.status = ?", "pending")}, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy
    # has_many :accepted_sent_friendships_requests, -> {where("friendships.status = ?", "accepted")}, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy
    # has_many :rejected_sent_friendships_requests, -> {where("friendships.status = ?", "rejected")}, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy

    has_many :received_friendships_requests, class_name: "Friendship", foreign_key: :recipient_id, dependent: :destroy
    # has_many :pending_received_friendships_requests, -> {where("friendships.status = ?", "pending")}, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy
    # has_many :accepted_received_friendships_requests, -> {where("friendships.status = ?", "accepted")}, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy
    # has_many :rejected_received_friendships_requests, -> {where("friendships.status = ?", "rejected")}, class_name: "Friendship", foreign_key: :sender_id, dependent: :destroy

    # has_many :new_friends, -> {self.joins("LEFT JOIN friendships as friend ON users.id = friend.sender_id LEFT JOIN users as user ON user.id = friend.sender_id").where("friendships.status = ?", "accepted")}, through: :sent_friendships_requests, source: :sender
    # has_many :accepted_friends, -> {self.joins("LEFT JOIN friendships ON users.id = friendships.recipient_id").where("status = ?", "accepted")}, through: :received_friendships_requests, source: :recipient

    def friends
        friendships = Friendship.where(sender: self, status: "accepted").or(Friendship.where(recipient: self,status: "accepted"))
        friendships.map{|f| f.sender === self ? f.recipient : f.sender}
    end
end
