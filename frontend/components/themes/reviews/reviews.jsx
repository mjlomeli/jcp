import {connect} from 'react-redux';
import React from 'react';
import './reviews.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {Product} from "../../../lib/product";
import {Review} from "../../../lib/review";
import {createReview, fetchProductReviews, fetchReview, updateReview} from "../../../actions/review_action";
import Rating from "../../user_controls/rating/rating";
import {fetchProductListing} from "../../../actions/product_action";


const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let userId = state.session.id;
    let reviews = Review.findByProductId(productId);
    let userReview = Review.findCurrentUserByProductId(productId);
    let firstName = state.entities.user.first_name;
    let userRating = userReview && userReview.rating;
    let userComment = userReview && userReview.comment;
    let averageRating = Reviews.averageRating(reviews);

    return {
        productId: productId,
        userId: userId,
        firstName: firstName,
        reviews: reviews,
        userReview: userReview,
        userRating: userRating || 0,
        userComment: userComment || "",
        reviewExists: !!userReview,
        averageRating: averageRating
    }
};

const mapDispatchToProps = dispatch => ({
    fetchReview: productId => dispatch(fetchProductReviews(productId)),
    fetchProductListing: productId => dispatch(fetchProductListing(productId)),
    createReview: review => dispatch(createReview(review)),
    updateReview: review => dispatch(updateReview(review))
});


class Reviews extends React.Component {

    static averageRating(reviews) {
        let ratings = reviews.map(review => review.rating);
        if (!ratings || !ratings.length)
            return 0;
        return ratings.reduce((a, b) => a + b) / ratings.length;
    }
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.userRating,
            comment: this.props.userComment,
            disabled: !this.props.userComment,
            averageRating: this.props.averageRating
        }

        this.onchangeinput = this.onChangeInput.bind(this);
        this.onkeyupinput = this.onKeyUpInput.bind(this);
        this.onclicksubmit = this.onClickSubmit.bind(this);
        this.onclickrating = this.onClickRating.bind(this);
    }



    onChangeInput(e) {
        this.setState({comment: e.currentTarget.value})
    }

    onKeyUpInput() {
        let disabled = this.state.comment.length === 0;
        if (disabled !== this.state.disabled)
            this.setState({disabled: disabled})
    }

    onClickSubmit() {
        let reviews = Review.findByProductId(this.props.productId).filter(r => r.user_id !== this.props.userId);
        let sumRating = reviews.reduce((nxt, rev) => rev + nxt, 0);
        let averageRating = (sumRating + this.state.rating) / (reviews.length + 1)
        let review = {
            user_id: this.props.userId,
            product_id: this.props.productId,
            comment: this.state.comment,
            rating: this.state.rating,
            first_name: this.props.firstName
        }

        if (this.props.reviewExists)
            this.props.updateReview(review);
        else
            this.props.createReview(review);
        this.setState({averageRating: averageRating})
    }

    onClickRating(value){
        this.setState({rating: value});
    }

    reviewForm() {
        let areas = ['rating', 'comment', 'submit'];
        let components = {
            'rating': <><span className="reviews-form-rating-label">Rating</span>
                <div className="reviews-form-input-rating"><Rating rating={this.state.rating} onClick={this.onclickrating}/></div>
            </>,
            'comment': <div className="reviews-comment"><span className="reviews-form-comment-label">Comment</span>
                <textarea className="reviews-comment-input" onChange={this.onchangeinput} value={this.state.comment}
                       onKeyUp={this.onkeyupinput} type="text"/></div>,
            'submit': <button className="reviews-submit"
                              onClick={this.onclicksubmit}
                              disabled={this.state.disabled}
                              type="button">Submit</button>
        }
        return !this.props.userId ? null : <GridLayout className="reviews-form-grid" areas={areas} components={components} />
    }

    reviewComponent(review) {
        let date = new Date(Date.parse(review.created_at));
        return <div className="reviews-each">
            <div className="reviews-each-header"><label className="reviews-first-name">{review.first_name}</label>
            <label className="reviews-date">{date.toLocaleString()}</label>
            </div>
            <Rating rating={review.rating} disabled={true}/>
            <p className="reviews-commented">{review.comment}</p>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductId = this.props.productId;
        let postProductId = nextProps.productId;

        let preUserId = this.props.userId;
        let postUserId = nextProps.userId;

        let preFirstName = this.props.firstName;
        let postFirstName = nextProps.firstName;

        let preReviews = this.props.reviews;
        let postReviews = nextProps.reviews;

        let preUserReview = this.props.userReview;
        let postUserReview = nextProps.userReview;

        let preUserRating = this.props.userRating;
        let postUserRating = nextProps.userRating;

        let preUserComment = this.props.userComment;
        let postUserComment = nextProps.userComment;

        let preRating = this.state.rating;
        let postRating = nextState.rating;
        let preComment = this.state.comment;
        let postComment = nextState.comment;
        let preDisabled = this.state.disabled;
        let postDisabled = nextState.disabled;

        let preAverageRating = this.state.averageRating;
        let postAverageRating = nextState.averageRating;

        if (preProductId !== postProductId)
            return true;
        else if (preReviews.length !== postReviews.length)
            return true;
        else if (preFirstName !== postFirstName)
            return true;
        else if (preUserId !== postUserId)
            return true;
        else if (preUserReview !== postUserReview)
            return true;
        else if (preUserRating !== postUserRating)
            return true;
        else if (preUserComment !== postUserComment)
            return true;
        else if (preRating !== postRating)
            return true;
        else if (preComment !== postComment)
            return true;
        else if (preDisabled !== postDisabled)
            return true;
        else if (preAverageRating !== postAverageRating)
            return true;
        return false;
    }

    isRenderValid() {
        return this.props.productId && this.props.reviews;
    }

    resolve() {
        if (!this.props.reviews)
            this.props.fetchProductListing(this.props.productId);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let layout = [];
        let components = {}
        this.props.reviews.forEach((review, idx) => {
            if (review.user_id !== this.props.userId) {
                layout.push(`comp_${idx}`);
                components[`comp_${idx}`] = this.reviewComponent(review);
            }
        })

        return <div className="reviews-header" key={`${this.props.productId}`}>
            {this.reviewForm()}
            <div className="reviews-summary">
                <span className="reviews-title">{this.props.reviews.length} reviews</span>
                <Rating rating={this.state.averageRating} disabled={true}/>
            </div>
            <GridLayout areas={layout} components={components} className="reviews-grid"
                        classElements="reviews-items"/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);