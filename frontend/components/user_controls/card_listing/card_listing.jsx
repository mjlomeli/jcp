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
            return <><span className="global-card-listing-calculated-price">${price.toFixed(2)}</span>&nbsp;</>;
        }
    }

    discounted(){
        let percentage = (this.state.discount) ? this.state.discount * 100 >> 0 : 0
        if (percentage)
            return <>&nbsp;<span className="global-card-listing-discount">({percentage}% off)</span></>
        return <></>
    }

    render() {
        return <>
            <div className="global-card-listing-price-container">
                {this.calculatedPrice()}
                <span className="global-card-listing-original-price">
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
            <div className="global-card-listing-additional">
                <label className="global-card-listing-additional-label">&nbsp;&nbsp;FREE shipping&nbsp;&nbsp;</label>
            </div>
        </>
    }

    recommendation(){
        return <>
            <div className="global-card-listing-additional">

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
            'image': <div className="global-card-listing-image-div">
                <img className="global-card-listing-image" alt="img"
                     aria-hidden="true" src={this.state.imageUrl} />
            </div>,
            'title': <label className="global-card-listing-title">{this.resize(this.state.title)}</label>,
            'rating': <Rating rating={4.6} disabled={true}/>,
            'price': <Price />,
            'additional': <Additional />
        }
        return <GridLayout areas={areas}
                           components={components}
                           gridClass="global-card-listing-grid"
                           itemClass="global-card-listing-items"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListing);