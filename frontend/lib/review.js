import {Store} from "./store";
import {debug, urlId} from "../utils/tools";

export class Review {
    static DEFAULT_ID = 1;

    static default() {
        let review = Review.findById(Review.DEFAULT_ID);
        if (review)
            return review;
        Store.store.dispatch(ReviewAction.fetchReview(Review.DEFAULT_ID));
        return null;
    }

    static findById(reviewId){
        let state = Store.store.getState();
        let review = null;
        if (state && state.entities && state.entities.reviews) {
            Object.entries(state.entities.reviews).every(product_pair =>{
                let [productId, users_reviews] = product_pair;
                Object.entries(users_reviews).every(users_pair => {
                    let [user_id, prod_review] = users_pair;
                    if (reviewId === prod_review.id){
                        review = prod_review;
                        return false;
                    }
                    return true;
                })
                return review === null;
            })
            return !review ? null : new Review(review);
        }
        return null;
    }

    static findIDFromProps(props) {
        let id = parseInt(urlId(props) || props.reviewId);
        if (!id || Review.hasError(id))
            return Review.DEFAULT_ID;
        else
            return id || null;
    }

    static findByProductId(productId){
        let reviews = Review.all()[productId] || {};
        console.log(reviews)
        return Object.values(reviews).map(rev => rev && new Review(rev));
    }

    static findByProductIdUserId(productId, userId){
        let reviews = Review.all()[productId] || {};
        if (!reviews)
            return null;
        let review = reviews[userId]
        return !review ? null : new Review(review);
    }

    static error(reviewId) {
        let state = Store.store.getState();
        let error = null;
        if (state && state.errors && state.errors.reviews) {
            Object.entries(state.errors.reviews).every(pair =>{
                let [productId, review] = pair;
                if (reviewId in review){
                    error = review[reviewId];
                    return false;
                }
                return true;
            })
            return error;
        }
        debug.error("state.errors.review does not exist");
    }

    static errors() {
        let state = Store.store.getState();
        if (state && state.errors && state.errors.reviews)
            return state.errors.reviews;
        debug.error("state.errors.reviews does not exist");
    }

    static hasError(reviewId) {
        if (Array.isArray(reviewId))
            return reviewId.every((id) => !!Review.error(id));
        return !!Review.error(reviewId)
    }

    static all() {
        let state = Store.store.getState();
        if (state && state.entities && state.entities.reviews)
            return state.entities.reviews;
        debug.error("state.entities.reviews does not exist")
        return {};
    }

    constructor(props) {
        if (!props)
            throw new Error("Review constructor can't be empty");
        this.id = props.id;
        this.product_id = props.product_id;
        this.user_id = props.user_id;
        this.first_name = props.first_name;
        this.rating = props.rating;
        this.comment = props.comment;
        this.created_at = props.created_at;
    }

    toString() {
        return `<Review(first_name: ${this.first_name}, rating: ${this.rating}, comment: ${this.comment})>`
    }

}

window.Review = Review;