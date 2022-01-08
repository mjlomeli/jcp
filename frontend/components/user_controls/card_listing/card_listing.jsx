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
import {fetchProduct, resetProductError} from "../../../actions/product_action";
import {fetchImageByProductId} from "../../../actions/image_action";
import {connect} from "react-redux";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";
import {urlPath} from "../../../utils/tools";

function findImage(product) {
    if (!product) return null;
    let images = product.imagesMedium();
    if (!images || images.length === 0) return null;
    let image = null;
    images.forEach(img => {
        if (!!img) return image = img;
    })
    return image;

}


const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let products = state.entities.products;
    let product = Product.findById(productId);
    let images = state.entities.groupImages;
    let image = findImage(product);

    console.log(`[mapStateToProps]: productId = ${productId}`);
    console.log(`[mapStateToProps]: product = ${product && product.toString() || null}`);
    console.log(`[mapStateToProps]: image = ${image && image.toString() || null}`);

    return {
        products: products,
        productId: productId,
        product: product,
        images: images,
        image: image
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    fetchImageByProductId: (productId) => dispatch(fetchImageByProductId(productId)),
    resetProductError: productId => dispatch(resetProductError(productId))
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
        this.favoriteFill = React.createRef();
        this.onclickfavorite = this.onClickFavorite.bind(this);
    }

    resize(length = 65) {
        let title = this.props.product.title;
        if (title.length > length)
            return `${title.slice(0, length - 3)}...`
        return title;
    }

    onClickFavorite(e) {
        //TODO: save product id to favorites
        this.favoriteFill.current.classList.toggle("card-listing-favored");
    }

    favoriteComponent() {
        return <div className="card-listing-favorite" onClick={this.onclickfavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="51 166.5 510 459">
                <path
                    d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153c43.391,2.685,84.259,21.312,114.75,52.301 c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153C561,464.544,348.101,625.5,306,625.5z M191.25,217.5 c-51.714,0-89.25,42.917-89.25,102c0,104.754,164.016,237.787,204,255c39.882-16.754,204-148.716,204-255 c0-59.083-37.536-102-89.25-102c-50.465,0-94.35,53.678-94.886,54.238L305.77,296.55l-19.763-24.989 C285.243,270.617,242.25,217.5,191.25,217.5z"/>
                <path ref={this.favoriteFill} fill="none"
                      d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153 c43.391,2.685,84.259,21.312,114.75,52.301c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153 C561,464.544,348.101,625.5,306,625.5z"/>
            </svg>
        </div>
    }

    imageComponent() {
        let productId = parseInt(this.props.product.id);
        let image = this.props.image;
        return <div>
            <div className="card-listing-image-div">
                {this.favoriteComponent()}
                <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
                    <img className="card-listing-image" alt="img" aria-hidden="true" src={image.source()}/>
                </Link>
            </div>
        </div>
    }

    titleComponent() {
        let productId = parseInt(this.props.product.id);
        let title = this.props.product.title;
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <label className="card-listing-title">{this.resize(title, this.props.length || 70)}</label>
        </Link>
    }

    ratingComponent(rating = Math.random() * 5, count = Math.floor(Math.random() * 100)) {
        let productId = parseInt(this.props.product.id);
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Rating rating={rating} count={count} disabled={true}/>
        </Link>
    }

    priceComponent(discount = Math.random() / 2) {
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
        let nextProductId = Product.findIDFromProps(nextProps);
        let prevProductId = Product.findIDFromProps(this.props);

        console.log(`[shouldUpdate]: prevProductId = ${prevProductId}`);
        console.log(`[shouldUpdate]: nextProductId = ${nextProductId}`);
        console.log(`[shouldUpdate]: hasError(prev) = ${Product.hasError(prevProductId)}`);
        console.log(`[shouldUpdate]: hasError(next) = ${Product.hasError(nextProductId)}`);
        console.log(`[shouldUpdate]: !!prevProduct = ${!!this.props.product}`);
        console.log(`[shouldUpdate]: !!nextProduct = ${!!nextProps.product}`);

        console.log(`[shouldUpdate]: ===> ${((!nextProductId || !nextProps.product 
            || !nextProps.image) || Product.hasError(nextProductId) || Image.hasError(nextProps.image.id) ||
        nextProductId === prevProductId) && "false" || "true"}`);

        if (nextProductId === prevProductId)
            return false;
        else if (!nextProductId || !nextProps.product || !nextProps.image)
            return false;
        else if (Product.hasError(nextProductId))
            return false;
        else if (Image.hasError(nextProps.image.id))
            return false;
        return true
    }

    isRenderValid() {
        return !!this.props.product && !!this.props.image;
    }

    resolveProduct(productId) {
        this.props.fetchProduct(productId).then(() => {}, e => {
            console.log("[resolveProduct] productId:", productId)
            //The data flat out fails and
            if (urlPath(this.props) === "/card_listing/:id") {
                console.log("\tRedirecting...")
                // redirects to the default path if the current path is of card_listing/:id
                //this.props.history.push(`/card_listing/1`);
                this.props.resetProductError(productId);
            }
            // its not from a path so its a raw component. So
            // doesn't reset the ProductError => this.props.resetProductError(productId);
            // Product error existing means I'll be using a default value.

            // Additionally, check that the default already exists in memory, else fetch it.
            if (!Product.default()) {
                console.log("\tNeed to fetch default product...")
                this.props.fetchProduct(Product.DEFAULT_ID);
            }
        })
    }

    resolveImage(productId) {
        this.props.fetchImageByProductId(productId).then(() => {}, e => {
            console.log("[resolveImage] productId:", productId)
            //No image was found. Must use a default Image.
            //Doesn't reset the error => this.props.resetImageError(imageId); TODO: not sure if correct resetImageError
            //So it can be used as an indicator to swap for a "default" image.

            //Additionally, check that the default already exists in memory, else fetch it.
            if (!Image.defaultProduct()){
                console.log("\tNeed to fetch default image...")
                this.props.fetchImageByProductId(Product.DEFAULT_ID);
            }


        })
    }

    resolve() {
        let productId = Product.findIDFromProps(this.props);

        if (!productId && urlPath(this.props) === "/card_listing/:id") {
            console.log("Have to redirect you.")
            //this.props.history.push(`/card_listing/1`);
        }
        if (!this.props.product)
            this.resolveProduct(productId);
        if (!this.props.image)
            this.resolveImage(productId);
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