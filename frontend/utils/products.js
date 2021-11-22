import {createSession, createUser, deleteSession} from "./session";

export const fetchProducts = () => $.ajax({
    url: '/api/products',
});

export const createReview = reviewId => $.ajax({
    url: '/api/reviews',
    method: 'POST',
    data: { productId: reviewId },
});

export const deleteReview = reviewId => $.ajax({
    url: '/api/reviews',
    method: 'DELETE',
    data: { reviewId: reviewId },
});




window.fetchProducts = fetchProducts;
window.createReview = createReview;
window.deleteReview = deleteReview;