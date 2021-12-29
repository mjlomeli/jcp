import { combineReducers } from 'redux';

import users from './entities/user_reducer';
import products from './entities/product_reducer'
import reviews from './entities/review_reducer'
import cartItems from './entities/cart_item_reducer'
import images from './entities/image_reducer'
import shops from './entities/shop_reducer'

export default combineReducers({
  users,
  products,
  shops,
  reviews,
  cartItems,
  images
});
