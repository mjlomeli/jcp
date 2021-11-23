class Review < ApplicationRecord
  validates :product_id, presence: true
  validates :user_id, presence: true
  validates :rating, presence: true
  validates :comment, presence: true, if: :not_rated?

  belongs_to :product,
             foreign_key: :product_id,
             class_name: :Product

  belongs_to :user,
             foreign_key: :user_id,
             class_name: :user

  def not_rated?
    # just an example of if statement validation
    self.rating.nil?
  end

end
