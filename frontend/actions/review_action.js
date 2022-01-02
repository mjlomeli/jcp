import * as ReviewUtil from '../utils/review_util'

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_REVIEW_ERROR = "RECEIVE_REVIEW_ERROR";
export const REMOVE_REVIEW = "REMOVE_REVIEW";

const receiveReviews = reviews =>({
    type: RECEIVE_REVIEWS,
    reviews: reviews
})

const receiveReview = review =>({
    type: RECEIVE_REVIEW,
    review: review
})

const removeReview = reviewId =>({
    type: REMOVE_REVIEW,
    reviewId: reviewId
})

const receiveReviewError = errors =>({
    type: RECEIVE_REVIEW_ERROR,
    errors: errors
})



/*    Separation      */


export const fetchUserReviews = (userId) => dispatch =>(
    ReviewUtil.fetchUserReviews(userId).then(
        reviews => dispatch(receiveReviews(reviews)),
        err => dispatch(receiveReviewError(err.responseJSON))
    )
)

export const fetchProductReviews = (productId) => dispatch =>(
    ReviewUtil.fetchProductReviews(productId).then(
        reviews => dispatch(receiveReviews(reviews)),
        err => dispatch(receiveReviewError(err.responseJSON))
    )
)


export const fetchReview = (productId, reviewId) => (dispatch) => {
    return ReviewUtil.fetchReview(productId, reviewId).then(
        review => dispatch(receiveReview(review)),
        err => dispatch(receiveReviewError(err.responseJSON))
    )
}

export const createReview = (productId, review) => dispatch =>(
    ReviewUtil.createReview(productId, review).then(
        review => dispatch(receiveReview(review)),
        err => dispatch(receiveReviewError(err.responseJSON))
    )
)

export const updateReview = (productId, review) => dispatch =>(
    ReviewUtil.updateReview(productId, review).then(
        review => dispatch(receiveReview(review)),
        err => dispatch(receiveReviewError(err.responseJSON))
    )
)

export const deleteReview = (productId, reviewId) => dispatch =>(
    ReviewUtil.deleteReview(productId, reviewId).then(
        review => dispatch(removeReview(review.id)),
        err => dispatch(receiveReviewError(err.responseJSON))
    )
)


window.ReviewAction = {
    fetchReview,
    fetchUserReviews,
    fetchProductReviews,
    createReview,
    updateReview,
    deleteReview
}