import {connect} from 'react-redux';
import React from 'react';
import './card_featured.css'
import './card_listing_rating.css'
import GridLayout from "../grid_layout/grid_layout";

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
            <div className="card-listing-rating">
                <div className="card-listing-star-rating">
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
                <label className="card-listing-rating-count">({this.state.count.toLocaleString()})</label>
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
            return <><span className="card-listing-calculated-price">${price.toFixed(2)}</span>&nbsp;</>;
        }
    }

    discounted(){
        let percentage = (this.state.discount) ? this.state.discount * 100 >> 0 : 0
        if (percentage)
            return <>&nbsp;<span className="card-listing-discount">({percentage}% off)</span></>
        return <></>
    }

    render() {
        return <>
            <div className="card-listing-price-container">
                {this.calculatedPrice()}
                <span className="card-listing-original-price">
                    ${this.state.price}
                </span>
                {this.discounted()}
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
            <div className="card-listing-shipping-container">
                <span className="shipping">&nbsp;&nbsp;FREE shipping&nbsp;&nbsp;</span>
            </div>
        </>
    }

    recommendation(){
        return <>
            <div className="card-listing-more-like-this">

            </div>
        </>
    }

    render() {
        return <>
            {this.shipping()}
        </>
    }
}

class CardListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
            imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg"
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }
    resize(title){
        if (title.length > 70) {
            return `${title.slice(0, 65)}...`
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
        let areas = ['image', 'title', 'rating', 'price', 'additional']
        let components = {
            'image': <div className="card-list-image-div">
                <img className="card-listing-image" alt="img"
                     aria-hidden="true" src={this.state.imageUrl} />
            </div>,
            'title': <label className="card-listing-title">{this.resize(this.state.title)}</label>,
            'rating': <Rating />,
            'price': <Price />,
            'additional': <Additional />
        }
        return <GridLayout areas={areas}
                           components={components}
                           gridClass="card-listing-grid"
                           itemClass="card-listing-items"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListing);