import {connect} from 'react-redux';
import React from 'react';
import './card_listing.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";

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
        this.state = {price: 7.47, discount: 0.6}
    }

    calculatedPrice(){
        if (this.state.discount){
            let price = this.state.price - (this.state.price * this.state.discount);
            return <><span className="card-listing-calculated-price">${price.toFixed(2)}</span>&nbsp;</>;
        }
    }

    discounted(){
        let percentage = (this.state.discount) ? this.state.discount * 100 >> 0 : 0
        if (percentage)
            return <>&nbsp;<span className="card-listing-discount">({percentage}% off)</span></>
        return <></>
    }

    render() {
        return <>
            <div className="card-listing-price-container">
                {this.calculatedPrice()}
                <span className="card-listing-original-price">
                    ${this.state.price}
                </span>
                {this.discounted()}
            </div>
        </>
    }
}

class Additional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shipping(){
        return <>
            <div className="card-listing-shipping-container">
                <span className="shipping">&nbsp;&nbsp;FREE shipping&nbsp;&nbsp;</span>
            </div>
        </>
    }

    recommendation(){
        return <>
            <div className="card-listing-more-like-this">

            </div>
        </>
    }

    render() {
        return <>
            {this.shipping()}
        </>
    }
}

class CardListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
            imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg"
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }
    resize(title){
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
        let areas = ['image', 'title', 'rating', 'price', 'additional']
        let components = {
            'image': <div className="card-list-image-div">
                <img className="card-listing-image" alt="img"
                     aria-hidden="true" src={this.state.imageUrl} />
            </div>,
            'title': <label className="card-listing-title">{this.resize(this.state.title)}</label>,
            'rating': <Rating rating={4.6} disabled={true}/>,
            'price': <Price />,
            'additional': <Additional />
        }
        return <GridLayout areas={areas}
                           components={components}
                           gridClass="card-listing-grid"
                           itemClass="card-listing-items"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListing);