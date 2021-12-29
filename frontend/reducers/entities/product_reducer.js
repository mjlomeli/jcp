import {
    RECEIVE_PRODUCT,
    REMOVE_PRODUCT,
    RECEIVE_PRODUCTS
} from "../../actions/product_action";

export default function ProductReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_PRODUCTS:
            action.products.forEach(product =>{
                newState[product.id] = product;
            })
            return newState;
        case RECEIVE_PRODUCT:
            newState[action.product.id] = action.product;
            return newState;
        case REMOVE_PRODUCT:
            delete newState[action.productId]
            return newState;
        default:
            return newState
    }
}