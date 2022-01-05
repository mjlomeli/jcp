import {
    RECEIVE_SHOP,
    REMOVE_SHOP,
    RECEIVE_SHOPS
} from "../../actions/shop_action";

export default function ShopReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_SHOPS:
            action.shops.forEach(shop =>{
                shop.id = parseInt(shop.id);
                newState[shop.id] = shop;
            })
            return newState;
        case RECEIVE_SHOP:
            action.shop.id = parseInt(action.shop.id);
            newState[action.shop.id] = action.shop;
            return newState;
        case REMOVE_SHOP:
            delete newState[parseInt(action.shopId)]
            return newState;
        default:
            return newState
    }
}