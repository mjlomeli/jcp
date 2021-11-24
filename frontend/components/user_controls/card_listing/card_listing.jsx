import {connect} from 'react-redux';
import React from 'react';
import './card_listing.css'
import './rating.css'

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rating: 5, count: 31909}
    }

    render() {
        return <>
            <div className="rating">
                <div className="star-rating">
                    <input type="radio" id="5-stars" name="rating" value="5"/>
                    <label htmlFor="5-stars" className="star">&#9733;</label>
                    <input type="radio" id="4-stars" name="rating" value="4"/>
                    <label htmlFor="4-stars" className="star">&#9733;</label>
                    <input type="radio" id="3-stars" name="rating" value="3"/>
                    <label htmlFor="3-stars" className="star">&#9733;</label>
                    <input type="radio" id="2-stars" name="rating" value="2"/>
                    <label htmlFor="2-stars" className="star">&#9733;</label>
                    <input type="radio" id="1-star" name="rating" value="1"/>
                    <label htmlFor="1-star" className="star">&#9733;</label>
                </div>
                &nbsp;
                <label className="rating-count">({this.state.count.toLocaleString()})</label>
            </div>
        </>
    }
}

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: 7.47, discount: 0.6}
    }

    calculatedPrice(){
        if (this.state.discount){
            let price = this.state.price - (this.state.price * this.state.discount);
            return <><span className="calculated-price">${price.toFixed(2)}</span>&nbsp;</>;
        }
    }

    discounted(){
        let percentage = (this.state.discount) ? this.state.discount * 100 >> 0 : 0
        if (percentage)
            return <>&nbsp;<span className="discount">({percentage}% off)</span></>
        return <></>
    }

    render() {
        return <>
            <div className="price-container">
                {this.calculatedPrice()}
                <span className="price">
                    ${this.state.price}
                </span>
                {this.discounted()}
                <div className="shipping-container">
                    <span className="shipping">&nbsp;&nbsp;FREE shipping&nbsp;&nbsp;</span>
                </div>
            </div>
        </>
    }
}


class CardListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            front: props.front,
            frontFlip: "",
            back: props.back,
            backFlip: "flip",
            cursor: ""
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
        this.flip();
    }

    render() {
        return <>
            <div className="card-listing">
                {/* Image or Video */}
                <div className="image">
                    <img alt="img" aria-hidden="true" src="https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg"/>
                </div>
                {/* Title */}
                <label className="title">
                    Personalized Name Puzzle With Pegs, New Baby Gift...
                </label>
                {/* Rating */}
                <div>
                    <Rating />
                </div>
                {/* Pricing */}
                <Price />
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListing);