import {connect} from 'react-redux';
import React from 'react';
import './card_thumbnail.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
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
        this.state = {price: 7.47, discount: 0.6, shipping: 0}
    }

    shipping() {
        let image = <svg version="1.1" viewBox="0 0 21 16.002" id="svg4" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="m 20.868,7.5000019 -4,-6.99999995 A 1,1 0 0 0 16,1.9472977e-6 H 4 A 1,1 0 0 0 3,1.0000019 v 1 H 1 a 1,1 0 0 0 0,2 h 4 a 1,1 0 0 1 0,2 H 2 a 1,1 0 0 0 0,2 H 4 A 1,1 0 0 1 4,10.000002 H 3 v 3 a 1,1 0 0 0 1,1 h 1.05 a 2.5,2.5 0 0 0 4.9,0 h 4.1 a 2.5,2.5 0 0 0 4.9,0 H 20 a 1,1 0 0 0 1,-1 V 8.0000019 a 1,1 0 0 0 -0.132,-0.5 z M 7.5,15.000002 a 1.5,1.5 0 1 1 0,-3 1.5,1.5 0 0 1 0,3 z m 5.488,-8.0000001 v -5 h 1.725 l 2.845,5 z M 16.5,15.000002 a 1.5,1.5 0 1 1 0,-3 1.5,1.5 0 0 1 0,3 z"/>
        </svg>
        return (this.state.shipping) ? <></> : <div className="global-card-thumbnail-shipping-div">{image}</div>
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

class CardThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
            imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg"
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    resize(title) {
        if (title.length > 70) {
            return `${title.slice(0, 65)}...`
        }
        return title;
    }

    componentDidMount() {
        // TODO: make sure title is resized
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
    }

    render() {
        return <>
            <div className="global-card-thumbnail">
                <img className="global-card-thumbnail-image"
                     alt="img" aria-hidden="true" src={this.state.imageUrl} />
                <Price/>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardThumbnail);