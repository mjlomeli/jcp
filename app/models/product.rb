class Product < ApplicationRecord
  belongs_to :store,
             foreign_key: :store_id,
             class_name: :Store

  has_many :reviews,
           foreign_key: :product_id,
           class_name: :Review
end
