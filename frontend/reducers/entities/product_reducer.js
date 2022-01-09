import {
    REMOVE_PRODUCTS,
    RECEIVE_PRODUCTS
} from "../../actions/product_action";

export default function ProductReducer(prevState={}, action){
    if ('listing' in action && !action.listing)
        return prevState;
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_PRODUCTS:
            let products = Object.entries(action.listing.products);
            products.forEach(pair =>{
                let [id, product] = pair;
                newState[parseInt(id)] = product;
            })
            return newState;
        case REMOVE_PRODUCTS:
            delete newState[parseInt(action.productId)]
            return newState;
        default:
            return prevState
    }
}