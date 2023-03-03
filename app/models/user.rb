class User < ApplicationRecord
    has_many :reviews
    has_many :courses, through: :reviews
    has_many :courses, through: :created_courses

    has_secure_password

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true

end
