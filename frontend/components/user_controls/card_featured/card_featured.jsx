import {connect} from 'react-redux';
import React from 'react';
import './card_featured.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";
import {Product} from "../../../lib/product";
import {urlId, urlPath} from "../../../utils/tools";
import {createFavorite, deleteFavorite, hasFavorite} from "../../../actions/favorite_action";
import {createLogin} from "../../../actions/ui_modal_action";


const mapStateToProps = (state, ownProps) =>{
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
        this.state = {}
    }

    calculatedPrice(){
        if (this.props.discount){
            let price = this.props.price - (this.props.price * this.props.discount);
            return <><label className="card-featured-calculated-price">${price.toFixed(2)}</label></>;
        }
    }

    discounted(){
        let percentage = (this.props.discount) ? this.props.discount * 100 >> 0 : 0
        if (percentage)
            return <><label className="card-featured-discount-price">({percentage}% off)</label></>
        return <></>
    }

    originalPrice(){
        return <label className="card-featured-original-price">${this.props.price}</label>
    }

    render() {

        return <>
            <div className="card-featured-price-container">
                {this.calculatedPrice()}
                <label className="card-featured-price-mod">
                    {this.originalPrice()}
                    {this.discounted()}
                </label>
            </div>
        </>
    }
}

class Additional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {freeShipping: props.freeShipping || false}
    }

    shipping(){
        return (this.props.freeShipping) ?
            <div className="card-featured-additional">
                <label className="card-featured-additional-label">FREE shipping</label>
            </div> :
            <></>;
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
        this.state = {}

        this.onclickfavorite = this.onClickFavorite.bind(this);
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClickFavorite(e){
        if (!this.props.userId){
            this.props.createLogin();
            return null;
        }
        if (this.props.favored)
            this.props.deleteFavorite(this.props.userId, this.props.productId);
        else
            this.props.createFavorite(this.props.userId, this.props.productId);
    }

    favoriteComponent(){
        return <div className="card-featured-favorite" onClick={this.onclickfavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="51 166.5 510 459">
                <path
                    d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153c43.391,2.685,84.259,21.312,114.75,52.301 c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153C561,464.544,348.101,625.5,306,625.5z M191.25,217.5 c-51.714,0-89.25,42.917-89.25,102c0,104.754,164.016,237.787,204,255c39.882-16.754,204-148.716,204-255 c0-59.083-37.536-102-89.25-102c-50.465,0-94.35,53.678-94.886,54.238L305.77,296.55l-19.763-24.989 C285.243,270.617,242.25,217.5,191.25,217.5z"/>
                <path fill={this.props.fill} d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153 c43.391,2.685,84.259,21.312,114.75,52.301c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153 C561,464.544,348.101,625.5,306,625.5z"/>
            </svg>
        </div>
    }

    imageComponent(){
        let source = this.props.images.length ? this.props.images[0].source() : null;
        return <div className="card-featured-image-div">
            {this.favoriteComponent()}
            <img className="card-featured-image" alt="img" aria-hidden="true" src={source} />
        </div>
    }

    resize(title){
        if (title.length > 200) {
            return `${title.slice(0, 72)}...`
        }
        return title;
    }

    onClick(e) {
        this.props.history.push(`/product/${this.props.productId}`);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = Product.findIDFromProps(this.props);
        let nextProductId = Product.findIDFromProps(nextProps);

        if (Product.hasError(productId)) {
            if (urlId(this.props) === productId) {
                this.props.history.push(`/card_featured/${Product.DEFAULT_ID}`);
                this.props.resetProductError(this.props.productId);
            } else {
                this.props.fetchProduct(Product.DEFAULT_ID);
            }
            return false;
        }
        return true;
    }

    isRenderValid(){
        return !!this.props.product && !!this.props.images;
    }

    resolve(){
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let product = this.props.product;
        let image = this.props.images[0];
        let infoAreas = ['rating', 'title', 'price', 'button']
        let infoComponents = {
            'rating': <>
                <label className="card-featured-store">{product.shop_id}</label>
                <Rating rating={4.3} count={235}
                        disabled={true} classCount="card-featured-rating-count"/>
                </>,
            'title': <label className="card-featured-title">{this.resize(product.title)}</label>,
            'price': <div className="card-featured-grouped-price">
                <Price price={product.price} discount={0.05}/>
                <Additional freeShipping={"free shipping"}/></div>,
            'button': <button className="card-featured-submit">
                <label className="card-featured-submit-label">Shop this item</label>
                </button>
        }

        let areas = ['image info']
        let components = {
            'image': this.imageComponent(),
            'info': <GridLayout areas={infoAreas}
                                components={infoComponents}
                                className="card-featured-info-grid"
                                classElements="card-featured-info-items"
            />
        }

        return <GridLayout areas={areas}
                           components={components}
                           className="card-featured-grid"
                           classElements="card-featured-items"
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFeatured);