json.extract! product, :id, :price, :seller_id
json.rating_count product.ratings.count
json.rating_by_current_user !!product.reviews.find_by(user_id: current_user.id)
