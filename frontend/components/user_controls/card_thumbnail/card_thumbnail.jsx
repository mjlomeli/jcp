import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    useHistory
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './card_thumbnail.css'
import {fetchProductListing, resetProductErrors} from "../../../actions/product_action";
import {Product} from "../../../lib/product";
import {urlId} from "../../../utils/tools";

const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId);
    let images = product && product.imagesSmall() || null;

    return {
        productId: productId,
        product: product,
        images: images
    }
};

const mapDispatchToProps = dispatch => ({
});

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: props.price || 0, discount: props.discount || 0, freeShipping: props.freeShipping || false}
    }

    shipping() {
        let image = <div className="card-thumbnail-shipping-div">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-69.5 742.5 140 100">
            <path d="M69.62,789.366l-26.667-43.741c-1.193-1.938-3.4-3.129-5.787-3.125h-80c-3.682,0-6.667,2.798-6.667,6.249v6.249h-13.333 c-3.682,0-6.667,2.798-6.667,6.249s2.985,6.249,6.667,6.249h26.667c3.682,0,6.666,2.797,6.666,6.248s-2.984,6.249-6.666,6.249h-20 c-3.682,0-6.667,2.798-6.667,6.249s2.985,6.248,6.667,6.248h13.333c3.682,0,6.667,2.799,6.667,6.25s-2.984,6.248-6.667,6.248H-49.5 v18.747c0,3.451,2.984,6.249,6.667,6.249h7c1.832,8.455,10.629,13.918,19.65,12.2c6.558-1.248,11.684-6.053,13.017-12.2h27.333 c1.832,8.455,10.629,13.918,19.65,12.2c6.559-1.248,11.685-6.053,13.016-12.2h7c3.682,0,6.667-2.798,6.667-6.249V792.49 C70.504,791.395,70.201,790.317,69.62,789.366z M-19.5,836.232c-5.523,0-10-4.196-10-9.373s4.478-9.374,10-9.374s10,4.197,10,9.374 S-13.977,836.232-19.5,836.232z M17.086,786.242v-31.244h11.5l18.966,31.244H17.086z M40.5,836.232 c-5.523,0-10.001-4.196-10.001-9.373s4.478-9.374,10.001-9.374c5.523,0,10,4.197,10,9.374S46.023,836.232,40.5,836.232z"/>
            </svg>
        </div>

        return (this.state.freeShipping) ? image : null;
    }

    price() {
        let price = this.state.price - (this.state.price * this.state.discount);
        return <>
            <label className="card-thumbnail-price-label">${price.toFixed(2)}</label>
        </>
    }

    render() {
        return <div className="card-thumbnail-price">
            {this.shipping()}
            {this.price()}
        </div>
    }
}

class CardThumbnail extends React.Component {
    constructor(props) {
        super(props);

        this.favoriteFill = React.createRef();
        this.onclickfavorite = this.onClickFavorite.bind(this);
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClickFavorite(e) {
        //TODO: save product id to favorites
        this.favoriteFill.current.classList.toggle("card-thumbnail-favored");
    }

    onClick(e){
        // TODO: send to product page
        this.props.history.push(`/product/${this.props.productId}`);
    }

    favoriteComponent() {
        return <div className="card-thumbnail-favorite" onClick={this.onclickfavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="51 166.5 510 459">
                <path
                    d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153c43.391,2.685,84.259,21.312,114.75,52.301 c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153C561,464.544,348.101,625.5,306,625.5z M191.25,217.5 c-51.714,0-89.25,42.917-89.25,102c0,104.754,164.016,237.787,204,255c39.882-16.754,204-148.716,204-255 c0-59.083-37.536-102-89.25-102c-50.465,0-94.35,53.678-94.886,54.238L305.77,296.55l-19.763-24.989 C285.243,270.617,242.25,217.5,191.25,217.5z"/>
                <path ref={this.favoriteFill} fill="none"
                      d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153 c43.391,2.685,84.259,21.312,114.75,52.301c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153 C561,464.544,348.101,625.5,306,625.5z"/>
            </svg>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = Product.findIDFromProps(this.props);

        if (Product.hasError(productId)) {
            if (urlId(this.props) === productId) {
                this.props.history.push(`/card_thumbnail/${Product.DEFAULT_ID}`);
                this.props.resetProductError(this.props.productId);
            } else {
                this.props.fetchProduct(Product.DEFAULT_ID);
            }
            return false;
        }
        return true;
    }

    isRenderValid() {
        return !!this.props.product && !!this.props.images;
    }

    resolve() {
        return null;
    }
    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let price = this.props.product.price;
        let source = this.props.images[0].source();
        return <div className="card-thumbnail">
            {this.favoriteComponent()}
            <Link to={`/product/${this.props.product.id}`} style={{textDecoration: "inherit", color: "inherit"}}>
                <img className="card-thumbnail-image"
                     alt="img" aria-hidden="true" src={source}/>
                <Price price={price} freeShipping={"free shipping"}/>
            </Link>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardThumbnail);