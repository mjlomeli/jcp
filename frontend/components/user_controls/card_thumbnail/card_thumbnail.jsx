import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './card_thumbnail.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({entities, session, errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: props.price || 0, discount: props.discount || 0, freeShipping: props.freeShipping || false}
    }

    shipping() {
        let image = <svg version="1.1" viewBox="0 0 21 16.002" id="svg4" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="m 20.868,7.5000019 -4,-6.99999995 A 1,1 0 0 0 16,1.9472977e-6 H 4 A 1,1 0 0 0 3,1.0000019 v 1 H 1 a 1,1 0 0 0 0,2 h 4 a 1,1 0 0 1 0,2 H 2 a 1,1 0 0 0 0,2 H 4 A 1,1 0 0 1 4,10.000002 H 3 v 3 a 1,1 0 0 0 1,1 h 1.05 a 2.5,2.5 0 0 0 4.9,0 h 4.1 a 2.5,2.5 0 0 0 4.9,0 H 20 a 1,1 0 0 0 1,-1 V 8.0000019 a 1,1 0 0 0 -0.132,-0.5 z M 7.5,15.000002 a 1.5,1.5 0 1 1 0,-3 1.5,1.5 0 0 1 0,3 z m 5.488,-8.0000001 v -5 h 1.725 l 2.845,5 z M 16.5,15.000002 a 1.5,1.5 0 1 1 0,-3 1.5,1.5 0 0 1 0,3 z"/>
        </svg>
        return (this.state.freeShipping) ? <div className="global-card-thumbnail-shipping-div">{image}</div> : <></>;
    }

    price() {
        let price = this.state.price - (this.state.price * this.state.discount);
        return <>
            <label className="global-card-thumbnail-price-label">${price.toFixed(2)}</label>
        </>
    }

    render() {
        return <div className="global-card-thumbnail-price">
            {this.shipping()}
            {this.price()}
        </div>
    }
}

let defaultCard = {
    title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
    price: 33.99,
    freeShipping: true,
    discount: 0,
    link: "/product_template"
}

class CardThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            imageUrl: props.imageUrl,
            price: props.price || 0,
            freeShipping: props.freeShipping || false,
            discount: props.discount || 0,
            link: props.link
        }

        if (typeof this.state.title === "undefined")
            this.state = {...defaultCard};

        this.onclick = props.onClick || this.onClick.bind(this);
    }

    componentDidMount() {
        // TODO: make sure title is resized
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product_template page
    }

    render() {
        return <Link to={this.state.link}>
            <div className="global-card-thumbnail">
                <img className="global-card-thumbnail-image"
                     alt="img" aria-hidden="true" src={this.state.imageUrl} />
                <Price price={this.state.price} freeShipping={this.state.freeShipping}/>
            </div>
        </Link>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardThumbnail);