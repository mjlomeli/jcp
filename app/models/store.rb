class Store < ApplicationRecord


  belongs_to :user,
             foreign_key: :user_id,
             class_name: :User

  has_many :products,
           foreign_key: :store_id,
           class_name: :Product

  def rating
    # avoid n+1 searches
    return 5
  end

  def sales_count
    return 10
  end

end
