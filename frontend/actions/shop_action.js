import * as ShopUtil from '../utils/shop_util'
import {
    createProduct, deleteProduct,
    fetchProduct,
    fetchProducts,
    fetchProductsRange,
    fetchRandomProductsRange, updateProduct
} from "./product_action";

export const RECEIVE_SHOPS = "RECEIVE_SHOPS";
export const RECEIVE_SHOP = "RECEIVE_SHOP";
export const RECEIVE_SHOP_ERROR = "RECEIVE_SHOP_ERROR";
export const REMOVE_SHOP = "REMOVE_SHOP";

const receiveShops = shops =>({
    type: RECEIVE_SHOPS,
    shops: shops
})

const receiveShop = shop =>({
    type: RECEIVE_SHOP,
    shop: shop
})

const receiveShopError = shopError =>({
    type: RECEIVE_SHOP_ERROR,
    shopError: shopError
})

const removeShop = shopId =>({
    type: REMOVE_SHOP,
    shopId: shopId
})



/*    Separation      */


export const fetchShops = () => dispatch =>(
    ShopUtil.fetchShops().then(
        shops => {
            return dispatch(receiveShops(shops))
        },
        err => dispatch(receiveShopError(err.responseJSON))
    )
)

export const fetchShop = shopId => (dispatch) => {
    return ShopUtil.fetchShop(shopId).then(
        shop => dispatch(receiveShop(shop)),
        err => dispatch(receiveShopError(err.responseJSON))
    )
}

export const createShop = shop => dispatch =>(
    ShopUtil.createShop(shop).then(
        shop => dispatch(receiveShop(shop)),
        err => dispatch(receiveShopError(err.responseJSON))
    )
)

export const updateShop = shop => dispatch =>(
    ShopUtil.updateShop(shop).then(
        shop => dispatch(receiveShop(shop)),
        err => dispatch(receiveShopError(err.responseJSON))
    )
)

export const deleteShop = shopId => dispatch =>(
    ShopUtil.deleteShop(shopId).then(
        shop => dispatch(removeShop(shop.id)),
        err => dispatch(receiveShopError(err.responseJSON))
    )
)

window.ShopAction = {
    fetchShops,
    fetchShop,
    createShop,
    updateShop,
    deleteShop
}