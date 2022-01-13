import * as ReviewUtil from '../utils/review_util'
import * as AlertAction from './alert_action'

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";


export const RECEIVE_REVIEW_ERROR = "RECEIVE_REVIEW_ERROR";
export const RECEIVE_REVIEWS_ERROR = "RECEIVE_REVIEWS_ERROR";
export const RESET_REVIEW_ERROR = "RESET_REVIEW_ERROR";
export const RESET_REVIEWS_ERROR = "RESET_REVIEWS_ERROR";

const receiveReviews = reviews =>({
    type: RECEIVE_REVIEWS,
    reviews: reviews
})

const removeReview = reviewId =>({
    type: REMOVE_REVIEW,
    reviewId: reviewId
})

const receiveReviewError = (dispatch, reviewId, errors) =>{
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_REVIEW_ERROR,
        reviewId: reviewId,
        errors: errors
    }
}


export const receiveReviewsError = (dispatch, errors) =>{
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_REVIEWS_ERROR,
        errors: errors
    }
}



/*    Separation      */


export const fetchUserReviews = (userId) => dispatch =>(
    ReviewUtil.fetchUserReviews(userId).then(
        reviews => dispatch(receiveReviews(reviews)),
        err => dispatch(receiveReviewsError(dispatch, err.responseJSON))
    )
)

export const fetchProductReviews = (productId) => dispatch =>(
    ReviewUtil.fetchProductReviews(productId).then(
        reviews => dispatch(receiveReviews(reviews)),
        err => dispatch(receiveReviewsError(dispatch, err.responseJSON))
    )
)


export const fetchReview = (productId, reviewId) => (dispatch) => {
    return ReviewUtil.fetchReview(productId, reviewId).then(
        reviews => dispatch(receiveReviews(reviews)),
        err => dispatch(receiveReviewError(reviewId, err.responseJSON))
    )
}

export const createReview = (productId, review) => dispatch =>(
    ReviewUtil.createReview(productId, review).then(
        reviews => {
            dispatch(AlertAction.caution("Your review has been created."));
            dispatch(receiveReviews(review))
        },
        err => dispatch(receiveReviewError(dispatch, review.id, err.responseJSON))
    )
)

export const updateReview = (productId, review) => dispatch =>(
    ReviewUtil.updateReview(productId, review).then(
        reviews => {
            dispatch(AlertAction.success("Your review has been saved."));
            dispatch(receiveReviews(reviews))
        },
        err => dispatch(receiveReviewError(dispatch, review.id, err.responseJSON))
    )
)

export const deleteReview = (productId, reviewId) => dispatch =>(
    ReviewUtil.deleteReview(productId, reviewId).then(
        review => {
            dispatch(AlertAction.notification("Your review has been deleted."));
            dispatch(removeReview(productId, reviewId))
        },
        err => dispatch(receiveReviewError(dispatch, reviewId, err.responseJSON))
    )
)

export const resetReviewError = reviewId => dispatch =>(
    dispatch({type: RESET_REVIEW_ERROR, reviewId: reviewId})
)

export const resetReviewsError = () => dispatch =>(
    dispatch({type: RESET_REVIEWS_ERROR})
)


window.ReviewAction = {
    fetchReview,
    fetchUserReviews,
    fetchProductReviews,
    resetReviewError,
    resetReviewsError,
    createReview,
    updateReview,
    deleteReview
}