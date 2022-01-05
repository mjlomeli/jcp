import * as ShopUtil from '../utils/shop_util'
import * as AlertAction from './alert_action'

export const RECEIVE_SHOPS = "RECEIVE_SHOPS";
export const RECEIVE_SHOP = "RECEIVE_SHOP";
export const REMOVE_SHOP = "REMOVE_SHOP";


export const RECEIVE_SHOP_ERROR = "RECEIVE_SHOP_ERROR";
export const RECEIVE_SHOPS_ERROR = "RECEIVE_SHOPS_ERROR";
export const RESET_SHOP_ERROR = "RESET_SHOP_ERROR";
export const RESET_SHOPS_ERROR = "RESET_SHOPS_ERROR";

const receiveShops = shops =>({
    type: RECEIVE_SHOPS,
    shops: shops
})

const receiveShop = shop =>({
    type: RECEIVE_SHOP,
    shop: shop
})

const removeShop = shopId =>({
    type: REMOVE_SHOP,
    shopId: shopId
})

const receiveShopError = (shopId, errors) =>({
    type: RECEIVE_SHOP_ERROR,
    shopId: shopId,
    errors: errors
})

export const receiveShopsError = errors =>({
    type: RECEIVE_SHOPS_ERROR,
    errors: errors
})

/*    Separation      */


export const fetchShops = () => dispatch =>(
    ShopUtil.fetchShops().then(
        shops => dispatch(receiveShops(shops)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveShopError(err.responseJSON))
        }
    )
)

export const fetchShop = shopId => (dispatch) => {
    return ShopUtil.fetchShop(shopId).then(
        shop => dispatch(receiveShop(shop)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveShopError(shopId, err.responseJSON))
        }
    )
}

export const createShop = shop => dispatch =>(
    ShopUtil.createShop(shop).then(
        shop => dispatch(receiveShop(shop)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveShopError(shop.id, err.responseJSON))
        }
    )
)

export const updateShop = shop => dispatch =>(
    ShopUtil.updateShop(shop).then(
        shop => dispatch(receiveShop(shop)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveShopError(shop.id, err.responseJSON))
        }
    )
)

export const deleteShop = shopId => dispatch =>(
    ShopUtil.deleteShop(shopId).then(
        shop => dispatch(removeShop(shop.id)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveShopError(shopId, err.responseJSON))
        }
    )
)

export const resetShopError = shopId => dispatch =>(
    dispatch({type: RESET_SHOP_ERROR, shopId: shopId})
)

export const resetShopsError = () => dispatch =>(
    dispatch({type: RESET_SHOPS_ERROR})
)

window.ShopAction = {
    fetchShops,
    fetchShop,
    resetShopsError,
    resetShopError,
    createShop,
    updateShop,
    deleteShop
}