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


const mapStateToProps = ({entities, errors, index, session}, ownProps) => {
    let cartItems = !session.id && {} || entities.cartItems;
    let productIds = !session.id && [] || [...entities.favorites];
    let products = productIds.map(id => Product.findById(id));

    let product = products[0];
    let images = product && product.imagesMedium();
    return {
        user_id: session.id,
        cartItems: cartItems,
        products: products,
        product: product,
        images: images
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCartItems: (user_id) => dispatch(fetchCartItems(user_id))
});

class CartTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let areas = ['cart_item1', 'cart_item2', 'cart_item3'];
        let components = {
            'cart_item1': <CartItem productId={1133338728}/>,
            'cart_item2': <CartItem productId={1147559603}/>,
            'cart_item3': <CartItem productId={1147316747}/>
        }
        return <GridLayout className="cart-checkout" areas={areas} components={components}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTemplate);
