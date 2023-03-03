class Course < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews


  validates :name, :par, :features, :description, :img_url, presence: true

end
