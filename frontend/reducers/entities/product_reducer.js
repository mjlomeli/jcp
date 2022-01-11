import {
    REMOVE_PRODUCTS,
    RECEIVE_PRODUCTS
} from "../../actions/product_action";
import {ENTITY} from "../constants";

export default function ProductReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch(action.type){
        case ENTITY:
        case RECEIVE_PRODUCTS:
            if ('listings' in action && 'products' in action.listings)
                newState = {...newState, ...action.listings.products};
            return newState;
        case REMOVE_PRODUCTS:
            action.productIds.forEach(productId => delete newState[parseInt(productId)])
            return newState;
        default:
            return prevState
    }
}