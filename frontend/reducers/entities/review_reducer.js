import {
    REMOVE_REVIEW,
    RECEIVE_REVIEWS
} from "../../actions/review_action";
import {ENTITY} from "../constants";

export default function ReviewReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case ENTITY:
            newState = {...newState, ...action.listings.reviews};
            return newState;
        case RECEIVE_REVIEWS:
            newState = {...newState, ...action.reviews}
            return newState;
        case REMOVE_REVIEW:
            let productId = parseInt(action.productId);
            let reviewId = parseInt(action.reviewId);
            if (productId in newState && reviewId in newState[productId])
                delete newState[productId][reviewId]
            return newState;
        default:
            return prevState
    }
}