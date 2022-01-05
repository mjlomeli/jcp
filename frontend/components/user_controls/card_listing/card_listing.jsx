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

const defaultProduct = new Product({
    id: 1133353182,
    title: "Spacey",
    price: 58,
    quantity: 2,
    description: "This glossy 24”x36” poster is a print of my original painting. Any solar system loving kid (or kid at heart) would love this addition to their room.",
    user_id: "581950580.0",
    shop_id: "33496843.0",
    image_ids: ["3600224003.0", "3552590640.0"],
    icon_ids: [],
    category_id: null,
    creation_tsz: "1640324634.0",
    ending_tsz: "1650775434.0",
    original_creation_tsz: "1640324634.0",
    last_modified_tsz: "1640328623.0",
    state_tsz: "1640324634.0",
    state: "active",
    categories: [],
    currency_code: "USD",
    sku: [],
    tags: ["classroom", "galaxy", "Milky Way", "solar system", "Art Print", "Poster", "Girls Decor", "Boys decor"],
    materials: ["art print", "high quality color", "museum quality print", "poster", "acrylic"],
    shop_section_id: null,
    featured_rank: null,
    url: "https://www.etsy.com/listing/1133353182/spacey?utm_source=educationalclone&utm_medium=api&utm_campaign=api",
    views: 2,
    num_favorers: 0,
    shipping_template_id: "164148130142",
    processing_min: 3,
    processing_max: 5,
    who_made: "i_did",
    is_supply: false,
    when_made: "2020_2021",
    item_weight: 10,
    item_weight_unit: "oz",
    item_length: 22,
    item_width: 3,
    item_height: 3,
    item_dimensions_unit: 0,
    is_private: false,
    style: null,
    non_taxable: false,
    is_customizable: false,
    is_digital: false,
    file_data: "",
    should_auto_renew: true,
    language: "en-US",
    has_variations: false,
    taxonomy_id: "106.0",
    taxonomy_path: ["Art & Collectibles", "Painting", "Acrylic"],
    used_manufacturer: false,
    is_vintage: false,
    results_per_page: 100,
    page_number: 1
})
const defaultImage = new Image({
    id: 4,
    data: null,
    mimetype: "image/jpeg",
    size: 6446,
    url: "https://i.etsystatic.com/33496843/r/il/d064bb/3600224003/il_170x135.3600224003_7i4l.jpg",
    encoding: "base64",
    name: null,
    group_name: "product",
    group_id: "3600224003.0",
    dimension: "image_medium",
    created_at: "2022-01-02T04:51:57.136Z",
    updated_at: "2022-01-02T04:51:57.136Z"
})

function findProductId(ownProps){
    if (!ownProps) return null;
    if (ownProps.productId)
        return parseInt(ownProps.productId);
    else if (ownProps.match && ownProps.match.params && ownProps.match.params.id)
        return parseInt(ownProps.match.params.id);
    return null;
}

function findImage(product){
    if (!product) return null;
    let images = product.imagesMedium();
    if (!images || images.length === 0) return null;
    let image = null;
    images.forEach(img => { if (!!img) return image = img; })
    return image;
}

const mapStateToProps = (state, ownProps) =>{
    let productId = findProductId(ownProps);
    let products = state.entities.products;
    let product = Product.findById(productId);

    let images = state.entities.groupImages;
    let image = findImage(product);

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

class CardListing extends React.Component {
    constructor(props) {
        super(props);
        this.favoriteFill = React.createRef();
        this.onclickfavorite = this.onClickFavorite.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = findProductId(this.props);
        if (Product.hasProductError(productId)) {
            this.props.history.push(`/card_listing/${defaultProduct.id}`);
            this.props.resetProductError(this.props.productId);
            return false;
        }
        return true;
    }

    resize(length=65) {
        let title = this.props.product.title;
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

    imageComponent(){
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

    titleComponent(){
        let productId = parseInt(this.props.product.id);
        let title = this.props.product.title;
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <label className="card-listing-title">{this.resize(title, this.props.length || 70)}</label>
        </Link>
    }

    ratingComponent(rating=Math.random() * 5, count=Math.floor(Math.random() * 100)){
        let productId = parseInt(this.props.product.id);
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Rating rating={rating} count={count} disabled={true}/>
        </Link>
    }

    priceComponent(discount=Math.random() / 2){
        let productId = parseInt(this.props.product.id);
        let price = this.props.product.price;
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Price price={price} discount={discount}/>
        </Link>
    }

    tagComponent(tag="free shipping", tags=[]){
        if (!tag && !tags.length)
            return null;
        let productId = parseInt(this.props.product.id);
        return <Link to={`/product/${productId}`} style={{textDecoration: 'none'}}>
            <Tags tag={tag} tags={tags} />
        </Link>
    }

    isRenderValid(){
        return !!this.props.product && !!this.props.image;
    }

    resolve(){
        CardListing.LoopCounter += 1;
        if (!this.props.product)
            this.props.fetchProduct(this.props.productId)
        else if (!this.props.image)
            this.props.fetchImageByProductId(this.props.productId)
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