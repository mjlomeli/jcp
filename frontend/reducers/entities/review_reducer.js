import {
    RECEIVE_REVIEW,
    REMOVE_REVIEW,
    RECEIVE_REVIEWS
} from "../../actions/review_action";

export default function ReviewReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_REVIEWS:
            action.reviews.forEach(review =>{
                review.id = parseInt(review.id)
                newState[review.id] = review;
            })
            return newState;
        case RECEIVE_REVIEW:
            action.review.id = parseInt(action.review.id);
            newState[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            delete newState[parseInt(action.reviewId)]
            return newState;
        default:
            return newState
    }
}