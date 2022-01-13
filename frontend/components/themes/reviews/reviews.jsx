import {connect} from 'react-redux';
import React from 'react';
import './reviews.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {Product} from "../../../lib/product";
import {Review} from "../../../lib/review";
import {fetchProductReviews, fetchReview} from "../../../actions/review_action";
import Rating from "../../user_controls/rating/rating";
import {fetchProductListing} from "../../../actions/product_action";


const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let userId = state.session.id;
    let reviews = Review.findByProductId(productId);
    return {
        productId: productId,
        userId: userId,
        reviews: reviews
    }
};

const mapDispatchToProps = dispatch => ({
    fetchReview: productId => dispatch(fetchProductReviews(productId)),
    fetchProductListing: productId => dispatch(fetchProductListing(productId))
});


class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rating: 0, comment: "", disabled: true}

        this.onchangeinput = this.onChangeInput.bind(this);
        this.onkeyupinput = this.onKeyUpInput.bind(this);
        this.onclicksubmit = this.onClickSubmit.bind(this);
    }

    isRenderValid() {
        return this.props.productId && this.props.reviews;
    }

    resolve() {
        if (!this.props.reviews)
            this.props.fetchProductListing(this.props.productId);
        return null;
    }

    onChangeInput(e){
        this.setState({comment: e.currentTarget.value})
    }

    onKeyUpInput(){
        let disabled = this.state.comment.length === 0;
        if (disabled !== this.state.disabled)
            this.setState({disabled: disabled})
    }

    onClickSubmit(){

    }

    reviewForm(){
        return !this.props.userId ? null : <>
            <span className="reviews-form-rating-label">Rating</span>
            <div className="reviews-form-input-rating"><Rating rating={this.state.rating}/></div>
            <span className="reviews-form-comment-label">Password</span>
            <input className="reviews-form-input-comment" onChange={this.onchangeinput} value={this.state.comment} onKeyUp={this.onkeyupinput} type="text"/>
            <button className="reviews-submit-button" onClick={this.onclicksubmit} disabled={this.state.disabled} type="button">Submit</button>
        </>
    }

    reviewComponent(review){
        return <>
            <label>{review.first_name}</label>
            <label>{review.created_at}</label>
            <Rating rating={review.rating} disabled={true}/>
            <p>{review.comment}</p>
        </>
    }

    averageRating() {
        let ratings = this.props.reviews.map(review => review.rating);
        if (!ratings || !ratings.length)
            return 0;
        return ratings.reduce((a,b) => a + b) / ratings.length;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let layout = [];
        let components = {}
        this.props.reviews.forEach((review, idx) => {
            layout.push(`comp_${idx}`);
            components[`comp_${idx}`] = this.reviewComponent(review);
        })

        return <div>
            {this.reviewForm()}
            <h2 className="reviews-title">{this.props.reviews.length} reviews</h2>
            <Rating rating={this.averageRating()} disabled={true}/>
            <GridLayout areas={layout} components={components} className="reviews-grid"
                        classElements="reviews-items"/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);