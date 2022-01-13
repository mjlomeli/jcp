import {debug} from "./tools";

export const fetchUserReviews = (userId) => {
    if (!userId){
        debug.error("A user id must be provided for fetchUserReviews");
    }
    return $.ajax({
        url: `/api/users/${userId}/reviews`,
        method: 'GET'
    });
};

export const fetchProductReviews = (productId) => {
    if (!productId){
        debug.error("A product id must be provided for fetchProductReviews");
    }
    return $.ajax({
        url: `/api/products/${productId}/reviews`,
        method: 'GET'
    });
};

export const fetchReview = (reviewId) => {
    if (!reviewId){
        debug.error("A and review id must be provided for fetchReview");
    }

    return $.ajax({
        url: `/api/reviews/${reviewId}`,
        method: 'GET'
    });
};


export const createReview = (review) => {
    if (!review || Object.keys(review).length === 0){
        debug.error("A product id and review object must be provided for createReview");
    }
    return $.ajax({
        url: `/api/products/${review.product_id}/reviews`,
        method: 'POST',
        data: {review: review}
    });
};

export const updateReview = (review) => {
    if (!review || Object.keys(review).length === 0){
        debug.error("A product id and review object must be provided for updateReview");
    }
    return $.ajax({
        url: `/api/products/${review.product_id}/reviews/${review.id}`,
        method: 'PATCH',
        data: {review: review}
    });
};

export const deleteReview = (productId, reviewId) => {
    if (!productId || !reviewId){
        debug.error("A product id and review id must be provided for deleteReview");
    }
    return $.ajax({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: 'DELETE'
    });
};


window.ReviewUtil = {
    fetchUserReviews,
    fetchProductReviews,
    createReview,
    updateReview,
    deleteReview
}
