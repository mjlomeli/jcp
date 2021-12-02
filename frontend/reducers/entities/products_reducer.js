import {
    RECEIVE_PRODUCT,
    REMOVE_PRODUCT,
    RECEIVE_PRODUCT_ERROR,
    RECEIVE_PRODUCTS
} from "../../actions/product_actions";

export default function ProductReducer(prevState={list: [], all: {}, one: null}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_PRODUCTS:
            newState.list = [];
            action.products.forEach(product =>{
                newState.all[product.id] = product;
                newState.list.push(product.id);
            })
            return newState;
        case RECEIVE_PRODUCT:
            newState.all[action.product.id] = action.product;
            newState.one = action.product;
            return newState;
        case REMOVE_PRODUCT:
            delete newState.products[action.productId]
            if (newState.productsList.includes(action.productId))
                newState.productsList.splice(newState.productsList.indexOf(action.productId), 1);
            if (newState.one && newState.one.id === action.productId)
                newState.one = null;
            return newState;
        case RECEIVE_PRODUCT_ERROR:
            return newState
        default:
            return newState
    }
}