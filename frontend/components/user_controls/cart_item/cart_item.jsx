import {connect} from 'react-redux';
import React from 'react';
import './cart_item.css'
import GridLayout from "../grid_layout/grid_layout";
import PaymentSelection from "../payment_selection/payment_selection";

const mapStateToProps = ({entities, session, errors}) => ({
    cart: entities.cart
});

const mapDispatchToProps = dispatch => ({
});

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeName: "ClarkandTaft",
            storeIcon: "https://i.etsystatic.com/isla/c03aba/25630519/isla_75x75.25630519_bbx5l4om.jpg?version=0",
            title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
            imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
            quantity: 1,
            price: 62.58,
            discount: 0.2,
            note: "",
            isGift: false,
            couponCode: "",
            paymentType: ""
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    resize(title){
        if (title.length > 75) {
            return `${title.slice(0, 72)}...`
        }
        return title;
    }

    componentDidMount() {
        // TODO: make sure title is resized
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product_template page
    }

    render(){
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);