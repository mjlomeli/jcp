import {connect} from 'react-redux';
import React from 'react';
import './cart_item.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";
import {Product} from "../../../lib/product";
import {urlId} from "../../../utils/tools";
import {fetchProductListing} from "../../../actions/product_action";
import PaymentSelection from "../payment_selection/payment_selection";
import {deleteCartItem} from "../../../actions/cart_item_action";


const mapStateToProps = (state, ownProps) =>{
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId);
    let images = product && product.imagesMedium();
    let userId = state.session.id;
    let cartItem = productId && state.entities.cartItems[productId] || {}
    return {
        productId: productId,
        product: product,
        images: images,
        userId: userId,
        quantity: cartItem.quantity || 0
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: productId => dispatch(fetchProductListing(productId)),
    deleteCartItem: productId => dispatch(deleteCartItem(productId))
});

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    calculatedPrice(){
        if (this.props.discount){
            let price = this.props.price - (this.props.price * this.props.discount);
            return <><label className="cart-item-calculated-price">${price.toFixed(2)}</label></>;
        }
    }

    discounted(){
        let percentage = (this.props.discount) ? this.props.discount * 100 >> 0 : 0
        if (percentage)
            return <><label className="cart-item-discount-price">({percentage}% off)</label></>
        return <></>
    }

    originalPrice(){
        return <label className="cart-item-original-price">${this.props.price}</label>
    }

    render() {

        return <>
            <div className="cart-item-price-container">
                {this.calculatedPrice()}
                <label className="cart-item-price-mod">
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
            <div className="cart-item-additional">
                <label className="cart-item-additional-label">FREE shipping</label>
            </div> :
            <></>;
    }

    recommendation(){
        return <>
            <div className="cart-item-additional">
            </div>
        </>
    }

    render() {
        return <>
            {this.shipping()}
        </>
    }
}


class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.onclickremove = this.onClickRemove.bind(this);
    }

    onClickRemove(e){
        this.props.deleteCartItem(this.props.productId);
    }

    imageComponent(){
        let source = this.props.images.length ? this.props.images[0].source() : null;
        return <div className="cart-item-image-div">
            <img className="cart-item-image" alt="img" aria-hidden="true" src={source} />
        </div>
    }

    resize(title){
        if (title.length > 200) {
            return `${title.slice(0, 72)}...`
        }
        return title;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductId = this.props.productId;
        let postProductId = nextProps.productId;

        let preQuantity = this.props.quantity;
        let postQuantity = nextProps.quantity;

        if (preProductId !== postProductId)
            return true;
        else if (preQuantity !== postQuantity)
            return true;
        return false;
    }

    isRenderValid(){
        return this.props.product && this.props.images && this.props.images.length;
    }

    resolve(){
        if (this.props.productId && !this.props.product)
            this.props.fetchProduct(this.props.productId);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let product = this.props.product;
        let quantityLabel = ` (${this.props.quantity})`;
        let infoAreas = ['rating', 'title', 'price', 'remove']
        let infoComponents = {
            'rating': <>
                <label className="cart-item-store">{product.shop_id}</label>
                <Rating rating={4.3} count={235}
                        disabled={true} classCount="cart-item-rating-count"/>
            </>,
            'title': <label className="cart-item-title">{this.resize(product.title)}{quantityLabel}</label>,
            'price': <div className="cart-item-grouped-price">
                <Price price={product.price * this.props.quantity} discount={0.05}/>
                <Additional freeShipping={"free shipping"}/></div>,
            'remove': <button className="cart-item-remove" type="button" onClick={this.onclickremove}>Remove</button>
        }

        let areas = ['image info']
        let components = {
            'image': this.imageComponent(),
            'info': <GridLayout areas={infoAreas}
                                components={infoComponents}
                                className="cart-item-info-grid"
                                classElements="cart-item-info-items"/>,
        }

        return <GridLayout areas={areas}
                           components={components}
                           className="cart-item-grid"
                           classElements="cart-item-items"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);