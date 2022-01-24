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
    let isUser = !!session.id;
    let cartItems = isUser ? entities.cartItems || {} : {};
    let isCached = Object.keys(cartItems).every(id => !!Product.findById(id));
    return {
        isUser: isUser,
        cartItems: cartItems,
        isCached: isCached
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCartItems: () => dispatch(fetchCartItems()),
    fetchProducts: productIds => dispatch(fetchProductsListings(productIds))
});

class CartTemplate extends React.Component {
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

    isRenderValid() {
        return this.props.isUser && this.props.cartItems && this.props.isCached;
    }

    resolve() {
        // if (this.props.isUser && !this.props.cartItems)
        //     this.props.fetchCartItems();
        // else if (!this.props.isCached)
        //     this.props.fetchProducts(Object.keys(this.props.cartItems));
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

export default connect(mapStateToProps, mapDispatchToProps)(CartTemplate);
