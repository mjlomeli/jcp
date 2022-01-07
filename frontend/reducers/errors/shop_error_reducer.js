import {
    RECEIVE_SHOP,
    RECEIVE_SHOP_ERROR,
    RESET_SHOP_ERROR,
    RESET_SHOPS_ERROR
} from "../../actions/shop_action";

export const errorShop = (prevState = {}, action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_SHOP_ERROR:
            newState[action.shopId] = action.errors;
            return newState;
        case RECEIVE_SHOP:
            delete newState[action.shop.id];
            return newState;
        case RESET_SHOP_ERROR:
            delete newState[action.shopId];
            return newState;
        default:
            return prevState;
    }
};


export const errorShops = (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_SHOP_ERROR:
            return action.errors;
        case RECEIVE_SHOP:
        case RESET_SHOPS_ERROR:
            return [];
        default:
            return prevState;
    }
};
