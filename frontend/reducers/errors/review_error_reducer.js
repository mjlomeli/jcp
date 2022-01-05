import {
    RECEIVE_REVIEW,
    RECEIVE_REVIEW_ERROR,
    RESET_REVIEW_ERROR,
    RESET_REVIEWS_ERROR
} from "../../actions/review_action";

export const errorReview = (prevState = [], action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_REVIEW_ERROR:
            newState[action.reviewId] = action.errors;
            return newState;
        case RECEIVE_REVIEW:
            delete newState[action.review.id];
            return newState;
        case RESET_REVIEW_ERROR:
            delete newState[action.reviewId];
            return newState;
        default:
            return prevState;
    }
};


export const errorReviews = (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_REVIEW_ERROR:
            return action.errors;
        case RECEIVE_REVIEW:
        case RESET_REVIEWS_ERROR:
            return [];
        default:
            return prevState;
    }
};
