class Favorite < ApplicationRecord
  validates_presence_of :user_id, :message => "A user_id must be provided"
  validates_presence_of :product_id, :message => "A product_id must be provided"

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  belongs_to :product,
             foreign_key: :product_id,
             class_name: :Product
end
