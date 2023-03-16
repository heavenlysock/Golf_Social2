class User < ApplicationRecord
    before_validation :assign_default_avatar, on: :create
    # include Rails.application.routes.url_helpers


    has_many :reviews
    has_many :reviewed_courses, through: :reviews, source: :course
    has_many :created_courses, class_name: "Course"
    # has_many :created_courses, through: :updated_courses
    has_secure_password

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true


    has_one :avatar
    # has_one_attached


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



    def accepted_friends
        friendships = Friendship.where(sender: self, status: "accepted").or(Friendship.where(recipient: self,status: "accepted"))
        friendships.map{|f| f.sender === self ? f.recipient : f.sender}
    end

    # def avatar_url
    #     if self.avatar.attached?
    #         rails_blob_url(self.avatar)
    #     end
    # end

    def assign_default_avatar
        return if self.avatar.present?
      
        default_avatar = Avatar.new
        image = MiniMagick::Image.open(Rails.root.join("app/assets/keith.png"))
        image.resize "200x250"
        default_avatar.img.attach(io: StringIO.new(image.to_blob), filename: "default_avatar.jpg")
        self.avatar = default_avatar
        end
end
