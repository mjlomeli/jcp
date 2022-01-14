import {combineReducers} from 'redux';
import user from './entities/user_reducer';
import products from './entities/product_reducer'
import reviews from './entities/review_reducer'
import cartItems from './entities/cart_item_reducer'
import {reducerImages, reducerProductImages, reducerUserImages, reducerShopImages, reducerGroupImages} from './entities/image_reducer'
import shops from './entities/shop_reducer'
import reducerFavorites from "./entities/favorite_reducer";

export default combineReducers({
    user,
    products,
    shops,
    reviews,
    favorites: reducerFavorites,
    cartItems,
    images: reducerImages,
    productImages: reducerProductImages,
    shopImages: reducerShopImages,
    userImages: reducerUserImages,
    groupImages: reducerGroupImages
});
