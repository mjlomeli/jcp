import {connect} from 'react-redux';
import React from 'react';
import './card_featured.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});


class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: 7.47, discount: 0.6}
    }

    calculatedPrice(){
        if (this.state.discount){
            let price = this.state.price - (this.state.price * this.state.discount);
            return <><label className="card-featured-calculated-price">${price.toFixed(2)}</label></>;
        }
    }

    discounted(){
        let percentage = (this.state.discount) ? this.state.discount * 100 >> 0 : 0
        if (percentage)
            return <><label className="card-featured-discount-price">({percentage}% off)</label></>
        return <></>
    }

    originalPrice(){
        return <label className="card-featured-original-price">${this.state.price}</label>
    }

    render() {
        return <>
            <div className="card-featured-price-container">
                {this.calculatedPrice()}
                <label className="card-featured-price-mod">
                    {this.originalPrice()} {this.discounted()}
                </label>
            </div>
        </>
    }
}

class Additional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shipping(){
        return <>
            <div className="card-featured-additional">
                <label className="card-featured-additional-label">FREE shipping</label>
            </div>
        </>
    }

    recommendation(){
        return <>
            <div className="card-featured-additional">

            </div>
        </>
    }

    render() {
        return <>
            {this.shipping()}
        </>
    }
}

class CardFeatured extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: "ClarkandTaft",
            rating: 4.6,
            title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
            imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg"
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }
    resize(title){
        if (title.length > 75) {
            return `${title.slice(0, 72)}...`
        }
        return title;
    }

    componentDidMount() {
        // TODO: make sure title is resized
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
    }

    render() {
        let areas = ['image rating', 'image title', 'image price', 'image button']
        let components = {
            'rating': <>
                <label className="card-featured-store">{this.state.storeName}</label>
                <Rating rating={4.6} disabled={true} classCount="card-featured-rating-count"/>
                </>,
            'image': <div className="card-list-image-div">
                <img className="card-featured-image" alt="img"
                     aria-hidden="true" src={this.state.imageUrl} />
            </div>,
            'title': <label className="card-featured-title">{this.resize(this.state.title)}</label>,
            'price': <div className="card-featured-grouped-price"><Price />
                <Additional /></div>,
            'button': <button className="card-featured-submit">
                <label className="card-featured-submit-label">Shop this item</label>
                </button>
        }
        return <GridLayout areas={areas}
                           components={components}
                           gridClass="card-featured-grid grid-test-featured"
                           itemClass="card-featured-items item-test-featured"
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFeatured);