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
        let image = <svg version="1.1" viewBox="0 0 21 16.002" id="svg4" width="100%" height="100%"
                         xmlns="http://www.w3.org/2000/svg">
            <path
                d="m 20.868,7.5000019 -4,-6.99999995 A 1,1 0 0 0 16,1.9472977e-6 H 4 A 1,1 0 0 0 3,1.0000019 v 1 H 1 a 1,1 0 0 0 0,2 h 4 a 1,1 0 0 1 0,2 H 2 a 1,1 0 0 0 0,2 H 4 A 1,1 0 0 1 4,10.000002 H 3 v 3 a 1,1 0 0 0 1,1 h 1.05 a 2.5,2.5 0 0 0 4.9,0 h 4.1 a 2.5,2.5 0 0 0 4.9,0 H 20 a 1,1 0 0 0 1,-1 V 8.0000019 a 1,1 0 0 0 -0.132,-0.5 z M 7.5,15.000002 a 1.5,1.5 0 1 1 0,-3 1.5,1.5 0 0 1 0,3 z m 5.488,-8.0000001 v -5 h 1.725 l 2.845,5 z M 16.5,15.000002 a 1.5,1.5 0 1 1 0,-3 1.5,1.5 0 0 1 0,3 z"/>
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

        this.favoriteFill = React.createRef();
        this.onclickfavorite = this.onClickFavorite.bind(this);
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClickFavorite(e) {
        //TODO: save product id to favorites
        this.favoriteFill.current.classList.toggle("card-thumbnail-favored");
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

    onClick(e) {
        // TODO: send to product_template page
    }

    render() {
        return <div className="global-card-thumbnail">
            {this.favoriteComponent()}
            <Link to={this.state.link}>
                <img className="global-card-thumbnail-image"
                     alt="img" aria-hidden="true" src={this.state.imageUrl}/>
                <Price price={this.state.price} freeShipping={this.state.freeShipping}/>
            </Link>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardThumbnail);