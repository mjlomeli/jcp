import { combineReducers } from 'redux';

import sessionErrors from './errors/session_error_reducer'
import {productsError, productsGeneralErrors} from './errors/product_error_reducer'
import {errorShop, errorShops} from './errors/shop_error_reducer'
import {errorReview, errorReviews} from './errors/review_error_reducer'
import {errorCartItem, errorCartItems} from './errors/cart_item_error_reducer'
import {errorImage, errorImages} from './errors/image_error_reducer'
import {modalErrorReducer} from "./ui/modal_reducer";

export default combineReducers({
  session: sessionErrors,
  products: productsError,
  productsGeneral: productsGeneralErrors,
  shops: errorShops,
  shop: errorShop,
  reviews: errorReviews,
  review: errorReview,
  cartItems: errorCartItems,
  cartItem: errorCartItem,
  images: errorImages,
  image: errorImage,
  modal: modalErrorReducer
});
