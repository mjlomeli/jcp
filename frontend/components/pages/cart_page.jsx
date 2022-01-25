import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './cart_page.css'
import GridLayout from "../user_controls/grid_layout/grid_layout";
import CartItem from "../user_controls/cart_item/cart_item"
import {fetchCartItems} from "../../actions/cart_item_action";
import {Product} from "../../lib/product";
import {fetchProductsListings} from "../../actions/product_action";


const mapStateToProps = ({entities, errors, index, session}, ownProps) => {
    let isLoggedIn = !!session.id;
    let userId = session.id;
    let cartItems = isLoggedIn ? entities.cartItems : {};
    let isCached = Object.keys(cartItems).every(id => !!Product.findById(id));
    return {
        isLoggedIn: isLoggedIn,
        userId: userId,
        cartItems: cartItems,
        isCached: isCached
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCartItems: userId => dispatch(fetchCartItems(userId)),
    fetchProducts: productIds => dispatch(fetchProductsListings(productIds))
});

class CartPage extends React.Component {
    static recentFetch = false;
    constructor(props) {
        super(props);
        this.state = {}
    }

    emptyCart(){
        return <div className="cart-empty">
            <h2 className="cart-title">Your cart is empty.</h2>
            <Link to="/home">Discover something unique.</Link>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductIds = Object.keys(this.props.cartItems);
        let postProductIds = Object.keys(nextProps.cartItems);

        let preUserId = this.props.userId;
        let postUserId = nextProps.userId;

        let preCached = this.props.isCached;
        let postCached = nextProps.isCached;

        // console.log(!preProductIds || !postProductIds)
        // console.log(`${preProductIds.length} !== ${postProductIds.length} =>`, preProductIds.length != postProductIds.length)
        // console.log(`${preUserId} != ${postUserId} => ${preUserId !== postUserId}`)
        // console.log(`${preProductIds} === ${postProductIds} =>`, !preProductIds.every(preId => postProductIds.includes(preId)));
        // console.log(`${preCached} !== ${postCached} => ${preCached !== postCached}`)

        if (!preProductIds || !postProductIds)
            return true;
        else if (preProductIds.length !== postProductIds.length)
            return true;
        else if (preUserId !== postUserId)
            return true;
        else if (preCached !== postCached)
            return true;
        else if (preProductIds.every(preId => !postProductIds.includes(preId)))
            return true;
        return false;
    }

    isRenderValid() {
        if (CartPage.recentFetch && this.props.isCached) {
            CartPage.recentFetch = false;
            return true;
        }
        return Object.keys(this.props.cartItems).length && this.props.isCached;
    }

    resolve() {
        let productIds = Object.keys(this.props.cartItems);
        if (!productIds.length && !CartPage.recentFetch) {
            CartPage.recentFetch = true;
            this.props.fetchCartItems(this.props.userId);
        }
        else if (!this.props.isCached)
            this.props.fetchProducts(productIds);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        else if (!Object.keys(this.props.cartItems).length)
            return this.emptyCart();

        let areas = [];
        let components = {}

        Object.keys(this.props.cartItems).forEach((id, idx) => {
            let layout = `cartItem_${idx}`;
            let product = Product.findById(id);
            areas.push(layout);
            components[layout] =  <CartItem productId={id} product={product} images={product.imagesMedium()}/>
        })

        return <GridLayout className="cart-checkout" areas={areas} components={components}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
