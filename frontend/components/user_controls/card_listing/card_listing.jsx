import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import React from 'react';
import './card_listing.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    calculatedPrice(){
        if (this.props.discount){
            let price = this.props.price || 0;
            let discount = this.props.discount || 0;
            let total = price - (price * discount);
            return <><span className="global-card-listing-calculated-price">${total.toFixed(2)}</span></>;
        }
    }

    discounted(){
        let percentage = (this.props.discount) ? this.props.discount * 100 >> 0 : 0
        if (percentage)
            return <><span className="global-card-listing-discount">({percentage}% off)</span></>
        return <></>
    }

    render() {
        return <>
            <Route className="global-card-listing-price-container">
                {this.calculatedPrice()}
                <span className="global-card-listing-original-price">
                    ${this.props.price}
                </span>
                {this.discounted()}
            </Route>
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
            <div className="global-card-listing-additional">
                <label className="global-card-listing-additional-label">FREE shipping</label>
            </div>
        </>
    }

    recommendation(){
        return <>
            <div className="global-card-listing-additional">

            </div>
        </>
    }

    render() {
        return <>
            {this.shipping()}
        </>
    }
}

let defaultListing = {
    title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
    rating: 4.6,
    ratingCount: 1399,
    store: "Plexida",
    price: 25.99,
    discount: 0.2,
    freeShipping: true,
    link: "/product_template"
}

class CardListing extends React.Component {
    constructor(props) {
        // fetchProduct(productId)
        super(props);

        this.state = {}
    }

    componentDidMount() {
        if (!this.state.listing) {
            if (this.props.listing)
                this.setState({listing: this.props.listing});
            else
                this.setState({listing: defaultListing});
        }
    }

    resize(title){
        if (title.length > 70) {
            return `${title.slice(0, 65)}...`
        }
        return title;
    }

    render() {
        if (!this.state.listing)
            return null;
        let {id, link, image_urls, imageUrl, price, rating, ratingCount, discount, store, quantity,
            store_id, title, user_id, views} = this.state.listing;
        imageUrl = (image_urls && image_urls[0]) || imageUrl
        let areas = ['image', 'title', 'rating', 'price', 'additional']
        let components = {
            'image': <div className="global-card-listing-image-div">
                <img className="global-card-listing-image" alt="img"
                     aria-hidden="true" src={imageUrl} />
            </div>,
            'title': <label className="global-card-listing-title">{this.resize(title)}</label>,
            'rating': <Rating rating={rating} count={ratingCount} disabled={true}/>,
            'price': <Price price={price} discount={discount}/>,
            'additional': <Additional freeShipping={true}/>
        }
        return <Link to={`/product/${id}`}>
        <GridLayout areas={areas}
                           components={components}
                           classGrid="global-card-listing-grid"
                           classElements="global-card-listing-items" />
            </Link>
    }
}

export default CardListing