import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    useHistory
} from 'react-router-dom';
import React from 'react';
import './card_listing.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";
import {connect} from "react-redux";
import {Product} from "../../../lib/product";
import {urlId} from "../../../utils/tools";
import {createFavorite, deleteFavorite, hasFavorite} from "../../../actions/favorite_action";
import {createLogin} from "../../../actions/ui_modal_action";


const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId);
    let images = product && product.imagesMedium();
    let favored = state.entities.favorites.has(productId) || false;
    let userId = state.session.id;

    return {
        productId: productId,
        product: product,
        images: images,
        favored: favored,
        fill: favored ? "#A61A2E" : "none",
        userId: userId
    }
};

const mapDispatchToProps = dispatch => ({
    createFavorite: (userId, productId) => dispatch(createFavorite(userId, productId)),
    deleteFavorite: (userId, productId) => dispatch(deleteFavorite(userId, productId)),
    createLogin: () => dispatch(createLogin())
});


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

    tagComponent(label, bgcolor, key) {
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

class CardListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onclickfavorite = this.onClickFavorite.bind(this);
    }

    resize(title, length = 65) {
        if (title.length > length)
            return `${title.slice(0, length - 3)}...`
        return title;
    }

    onClickFavorite(e) {
        if (!this.props.userId){
            this.props.createLogin();
            return null;
        }
        if (this.props.favored) {
            this.props.deleteFavorite(this.props.userId, this.props.productId);
        }
        else {
            this.props.createFavorite(this.props.userId, this.props.productId);
        }
    }

    favoriteComponent() {
        return <div className="card-listing-favorite" onClick={this.onclickfavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="51 166.5 510 459">
                <path
                    d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153c43.391,2.685,84.259,21.312,114.75,52.301 c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153C561,464.544,348.101,625.5,306,625.5z M191.25,217.5 c-51.714,0-89.25,42.917-89.25,102c0,104.754,164.016,237.787,204,255c39.882-16.754,204-148.716,204-255 c0-59.083-37.536-102-89.25-102c-50.465,0-94.35,53.678-94.886,54.238L305.77,296.55l-19.763-24.989 C285.243,270.617,242.25,217.5,191.25,217.5z"/>
                <path fill={this.props.fill} d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153 c43.391,2.685,84.259,21.312,114.75,52.301c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153 C561,464.544,348.101,625.5,306,625.5z"/>
            </svg>
        </div>
    }

    imageComponent() {
        let productId = parseInt(this.props.product.id);
        let source = this.props.images[0].source();
        return <div>
            <div className="card-listing-image-div">
                {this.favoriteComponent()}
                <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
                    <img className="card-listing-image" alt="img" aria-hidden="true" src={source}/>
                </Link>
            </div>
        </div>
    }

    titleComponent() {
        let productId = parseInt(this.props.product.id);
        let title = this.props.product.title;
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <label className="card-listing-title">{this.resize(title, this.props.length)}</label>
        </Link>
    }

    ratingComponent(rating = 4.3, count = 235) {
        let productId = parseInt(this.props.product.id);
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Rating rating={rating} count={count} disabled={true}/>
        </Link>
    }

    priceComponent(discount = 0.05) {
        let productId = parseInt(this.props.product.id);
        let price = this.props.product.price;
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Price price={price} discount={discount}/>
        </Link>
    }

    tagComponent(tag = "free shipping", tags = []) {
        if (!tag && !tags.length)
            return null;
        let productId = parseInt(this.props.product.id);
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Tags tag={tag} tags={tags}/>
        </Link>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductId = this.props.productId;
        let postProductId = nextProps.productId;

        let preFavored = this.props.favored;
        let postFavored = nextProps.favored;

        if (preProductId !== postProductId)
            return true;
        else if (preFavored !== postFavored)
            return true;
        return false;
    }

    isRenderValid() {
        if (!this.props.productId)
            return false;
        return !!this.props.product && !!this.props.images;
    }

    resolve() {
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let areas = ['image', 'title', 'rating', 'price', 'tag']
        let components = {
            'image': this.imageComponent(),
            'title': this.titleComponent(),
            'rating': this.ratingComponent(),
            'price': this.priceComponent(),
            'tag': this.tagComponent("free shipping")
        }

        return <GridLayout areas={areas}
                           components={components}
                           className="global-card-listing-grid"
                           classElements="global-card-listing-items"/>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CardListing);