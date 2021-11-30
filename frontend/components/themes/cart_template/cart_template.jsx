import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './cart_template.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CardFeatured from "../../user_controls/card_featured/card_featured";
import PaymentType from "../../user_controls/payment_type/payment_type";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class CartTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let areas = ['cart_item1 payment_type1', 'cart_item2 payment_type2', 'cart_item3 payment_type3'];
        let components = {
            'cart_item1': <CardFeatured />,
            'payment_type1': <PaymentType />,
            'cart_item2': <CardFeatured />,
            'payment_type2': <PaymentType />,
            'cart_item3': <CardFeatured />,
            'payment_type3': <PaymentType />
        }
        return <GridLayout areas={areas} components={components}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTemplate);