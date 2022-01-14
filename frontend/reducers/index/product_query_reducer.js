import {ENTITY} from "../constants";
import {permitProductQuery, queryToString} from "../../utils/tools";

export default function ProductQueryReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch(action.type){
        case ENTITY:
            if ('listings' in action && 'query' in action.listings) {
                let query = queryToString(action.listings.query);
                console.log("Reducer: ", query)
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