class Review < ApplicationRecord
  belongs_to :product,
             foreign_key: :product_id,
             class_name: :Product

end
