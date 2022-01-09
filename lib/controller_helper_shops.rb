
def fetch_shop
  @shop = shop_from_params(@query)
  if @shop
    render json: @shop
  else
    render json: ["Could not find shop id: #{@query[:shop_id]}"], status: 400
  end
end

def fetch_shops
  @shops = shops_from_params(@query)
  if @shops and !@shops.empty?
    render json: @shops
  else
    render json: ["Could not find shop ids: #{@query[:shop_ids]}"], status: 400
  end
end

def fetch_user_shop
  user = user_from_params(@query)
  if user
    @shops = user.shop
    render json: @shops
  else
    render json: ["Could not find user id: #{@query[:user_id]}"], status: 400
  end
end

def fetch_shop_title
  @shop = Shop.where("shops.title ILIKE ?", "%#{@query[:title]}%")
  if @shop and !@shop.empty?
    render json: @shop
  else
    render json: ["Could not find shop with title: #{@query[:title]}"], status: 400
  end
end

def fetch_shop_name
  @shop = Shop.where("shops.shop_name ILIKE ?", "%#{@query[:shop_name]}%")
  if @shop and !@shop.empty?
    render json: @shop
  else
    render json: ["Could not find shop with name: #{@query[:shop_name]}"], status: 400
  end
end
