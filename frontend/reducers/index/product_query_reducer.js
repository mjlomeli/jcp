import {ENTITY} from "../constants";
import {queryToString} from "../../utils/tools";
import {RECEIVE_PRODUCTS_AS_QUERY} from "../../actions/product_action";

export default function ProductQueryReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch(action.type){
        case ENTITY:
        case RECEIVE_PRODUCTS_AS_QUERY:
            if ('listings' in action && 'query' in action.listings) {
                let query = queryToString(action.listings.query);
                let relation = {};
                if ('products' in action.listings)
                    relation['products'] = action.listings.products;
                if ('images' in action.listings)
                    relation['images'] = action.listings.images;
                if ('reviews' in action.listings)
                    relation['reviews'] = action.listings.reviews;
                if (Object.keys(relation).length)
                    newState[query] = relation;
            }
            return newState;
        default:
            return prevState
    }
}