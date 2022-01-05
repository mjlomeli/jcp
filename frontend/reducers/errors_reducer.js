import { combineReducers } from 'redux';

import sessionErrors from './errors/session_error_reducer'
import {errorProduct, errorProducts} from './errors/product_error_reducer'
import uiErrors from './errors/ui_error_reducer'
import {errorShop, errorShops} from './errors/shop_error_reducer'
import {errorReview, errorReviews} from './errors/review_error_reducer'
import {errorCartItem, errorCartItems} from './errors/cart_item_error_reducer'
import {errorImage, errorImages} from './errors/image_error_reducer'

export default combineReducers({
  session: sessionErrors,
  products: errorProducts,
  product: errorProduct,
  ui: uiErrors,
  shops: errorShops,
  shop: errorShop,
  reviews: errorReviews,
  review: errorReview,
  cartItems: errorCartItems,
  cartItem: errorCartItem,
  images: errorImages,
  image: errorImage
});
