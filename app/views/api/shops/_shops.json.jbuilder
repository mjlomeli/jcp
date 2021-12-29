json.extract! shop, :id
json.shop_id shop.shop_id
json.title !!shop.title.find_by(user_id: current_user.id)
