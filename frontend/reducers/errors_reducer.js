import { combineReducers } from 'redux';

import sessionErrors from './errors/session_error_reducer'
import productsErrors from './errors/product_error_reducer'
import uiErrors from './errors/ui_error_reducer'
import shopErrors from './errors/shop_error_reducer'
import reviewErrors from './errors/review_error_reducer'
import cartItemError from './errors/cart_item_error_reducer'
import imageError from './errors/image_error_reducer'

export default combineReducers({
  session: sessionErrors,
  products: productsErrors,
  ui: uiErrors,
  shops: shopErrors,
  reviews: reviewErrors,
  cartItems: cartItemError,
  images: imageError
});
