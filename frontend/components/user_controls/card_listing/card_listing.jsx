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
        return <span className="card-listing-price">${price.toFixed(2)}</span>;
    }

    discountedComponent() {
        if (!this.props.discount)
            return null;
        return <span className="card-listing-discounted">
            ${this.props.price}
        </span>
    }

    percentOffComponent() {
        if (!this.props.discount)
            return null;
        let percentage = this.props.discount * 100 >> 0;
        return <><span className="card-listing-percentage-off">({percentage}% off)</span></>
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

    tagComponent(label, bgcolor, key){
        return <div className="card-listing-tags" style={{backgroundColor: bgcolor}} key={key}>
            <label className="card-listing-tags-label">{label}</label>
        </div>
    }

    render() {
        let labels = this.props.tag && [this.props.tag] || this.props.tags || [];
        return <>
            {labels.map((label, index) => {
                switch (label.toLowerCase()) {
                    case "free shipping":
                        return this.tagComponent("FREE shipping", '#D4E9D7', index);
                    default:
                        return this.tagComponent(label || "No Label", '#c9b0fd', index);
                }
            })}
        </>
    }
}

let defaultListing = {
    id: 1,
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
        super(props);
        this.favoriteFill = React.createRef();
        this.onclickfavorite = this.onClickFavorite.bind(this);
    }

    resize(title, length=70) {
        if (title.length > length)
            return `${title.slice(0, length-3)}...`
        return title;
    }

    onClickFavorite(e){
        //TODO: save product id to favorites
        this.favoriteFill.current.classList.toggle("card-listing-favored");
    }

    favoriteComponent(){
        return <div className="card-listing-favorite" onClick={this.onclickfavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="51 166.5 510 459">
                <path d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153c43.391,2.685,84.259,21.312,114.75,52.301 c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153C561,464.544,348.101,625.5,306,625.5z M191.25,217.5 c-51.714,0-89.25,42.917-89.25,102c0,104.754,164.016,237.787,204,255c39.882-16.754,204-148.716,204-255 c0-59.083-37.536-102-89.25-102c-50.465,0-94.35,53.678-94.886,54.238L305.77,296.55l-19.763-24.989 C285.243,270.617,242.25,217.5,191.25,217.5z"/>
                <path ref={this.favoriteFill} fill="none" d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153 c43.391,2.685,84.259,21.312,114.75,52.301c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153 C561,464.544,348.101,625.5,306,625.5z"/>
            </svg>
        </div>
    }

    imageComponent(productId, imageUrl){
        return <div>
            <div className="card-listing-image-div">
                {this.favoriteComponent()}
                <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
                    <img className="card-listing-image" alt="img" aria-hidden="true" src={imageUrl}/>
                </Link>
            </div>
        </div>
    }

    titleComponent(productId, title){
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <label className="card-listing-title">{this.resize(title, this.props.length || 70)}</label>
        </Link>
    }

    ratingComponent(productId, rating, count){
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Rating rating={rating} count={count} disabled={true}/>
        </Link>
    }

    priceComponent(productId, price, discount){
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Price price={price} discount={discount}/>
        </Link>
    }

    tagComponent(productId, tag, tags){
        if (!tag || !tags)
            return null;
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Tags tag={tag} tags={tags} />
        </Link>
    }

    render() {
        let { id, image_urls, imageUrl, price, rating, ratingCount, discount, title } = this.props.listing || defaultListing;
        imageUrl = (image_urls && image_urls[0]) || imageUrl

        let areas = ['image', 'title', 'rating', 'price', 'tag']
        let components = {
            'image': this.imageComponent(id, imageUrl),
            'title': this.titleComponent(id, title),
            'rating': this.ratingComponent(id, rating, ratingCount),
            'price': this.priceComponent(id, price, discount),
            'tag': this.tagComponent(id, "free shipping")
        }

        return <GridLayout areas={areas}
                        components={components}
                        className="global-card-listing-grid"
                        classElements="global-card-listing-items"/>
    }
}

export default CardListing