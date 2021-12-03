export const fetchUserReviews = (userId) => {
    ```PG::DatatypeMismatch: ERROR:  argument of WHERE must be type boolean, not type integer
    LINE 1: SELECT  "users".* FROM "users" WHERE (4) LIMIT $1
                                                  ^
    : SELECT  "users".* FROM "users" WHERE (4) LIMIT $1```
    return $.ajax({
        url: `/api/users/${userId}/reviews`,
        method: 'GET'
    });
};

export const fetchProductReviews = (productId) => {
    ```PG::DatatypeMismatch: ERROR:  argument of WHERE must be type boolean, not type integer
    LINE 1: SELECT  "users".* FROM "users" WHERE (4) LIMIT $1
                                                  ^
    : SELECT  "users".* FROM "users" WHERE (4) LIMIT $1```
    return $.ajax({
        url: `/api/products/${productId}/reviews`,
        method: 'GET'
    });
};

export const fetchReview = (productId, reviewId) => {
    return $.ajax({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: 'GET'
    });
};


export const createReview = (productId, review) => {
    // Column user_id doesnt exist must use find_by(id: params[:user_id])
    return $.ajax({
        url: `/api/products/${productId}/reviews`,
        method: 'POST',
        data: {review: review}
    });
};

export const updateReview = (productId, review) => {
    // Column user_id doesnt exist must use find_by(id: params[:user_id])
    return $.ajax({
        url: `/api/products/${productId}/reviews/${review.id}`,
        method: 'PATCH',
        data: {review: review}
    });
};

export const deleteReview = (productId, reviewId) => {
    // Column user_id doesnt exist must use find_by(id: params[:user_id])
    return $.ajax({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: 'DELETE'
    });
};


window.fetchUserReviews = fetchUserReviews;
window.fetchProductReviews = fetchProductReviews;
window.createReview = createReview;
window.updateReview = updateReview;
window.deleteReview = deleteReview;
