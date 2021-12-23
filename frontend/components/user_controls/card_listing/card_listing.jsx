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
    }

    priceComponent() {
        let price = this.props.price || 0;
        let discount = this.props.discount || 0;
        price = price - (price * discount);
        return <><span className="global-card-listing-calculated-price">${price.toFixed(2)}</span></>;
    }

    discountedComponent() {
        if (!this.props.discount)
            return null;
        return <span className="global-card-listing-original-price">
            ${this.props.price}
        </span>
    }

    percentOffComponent() {
        if (!this.props.discount)
            return null;
        let percentage = this.props.discount * 100 >> 0;
        return <><span className="global-card-listing-discount">({percentage}% off)</span></>
    }

    render() {
        return <div className="global-card-listing-price-container">
            {this.priceComponent()}
            {this.discountedComponent()}
            {this.percentOffComponent()}
        </div>
    }
}

class Tags extends React.Component {
    constructor(props) {
        super(props);
    }

    tagComponent(label, color, key){
        return <div className="global-card-listing-additional" key={key}>
            <label className="global-card-listing-additional-label" style={{backgroundColor: color}}>{label}</label>
        </div>
    }

    render() {
        let labels = [this.props.tag] || this.props.tags || [];
        return <>
            {labels.map((label, index) => {
                switch (label.toLowerCase()) {
                    case "free shipping":
                        return this.tagComponent("FREE shipping", '#D4E9D7', index);
                    default:
                        return this.tagComponent("No Label", '#000222', index);
                }
            })}
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
    label: ['free shipping'],
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

    resize(title) {
        if (title.length > 70) {
            return `${title.slice(0, 65)}...`
        }
        return title;
    }

    render() {
        if (!this.state.listing)
            return null;
        let {
            id, link, image_urls, imageUrl, price, rating, ratingCount, discount, store, quantity,
            store_id, title, user_id, views
        } = this.state.listing;
        imageUrl = (image_urls && image_urls[0]) || imageUrl
        let areas = ['image', 'title', 'rating', 'price', 'additional']
        let components = {
            'image': <div className="global-card-listing-image-div">
                <img className="global-card-listing-image" alt="img"
                     aria-hidden="true" src={imageUrl}/>
            </div>,
            'title': <label className="global-card-listing-title">{this.resize(title)}</label>,
            'rating': <Rating rating={rating} count={ratingCount} disabled={true}/>,
            'price': <Price price={price} discount={discount}/>,
            'additional': <Additional freeShipping={true}/>
        }
        return <Link to={`/product/${id}`} style={{textDecoration: 'none'}}>
            <GridLayout areas={areas}
                        components={components}
                        className="global-card-listing-grid"
                        classElements="global-card-listing-items"/>
        </Link>
    }
}

export default CardListing