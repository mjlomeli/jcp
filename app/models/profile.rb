class Profile < ApplicationRecord
  has_one :user,
          foreign_key: :user_id,
          class_name: :User

  has_many :reviews,
           through: :user,
           source: :reviews
end
