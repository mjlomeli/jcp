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
        let image = <svg className="card-thumbnail-shipping-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" aria-hidden="true" focusable="false"><path d="M21.868 11.5l-4-7A1 1 0 0017 4H5a1 1 0 00-1 1v1H2a1 1 0 000 2h4a1 1 0 010 2H3a1 1 0 000 2h2a1 1 0 010 2H4v3a1 1 0 001 1h1.05a2.5 2.5 0 004.9 0h4.1a2.5 2.5 0 004.9 0H21a1 1 0 001-1v-5a1 1 0 00-.132-.5zM8.5 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5.488-8V6h1.725l2.845 5h-4.57zm3.512 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>
        return (this.state.shipping) ? <></> : image
    }

    price() {
        let price = this.state.price - (this.state.price * this.state.discount);
        return <>
            <label>${price.toFixed(2)}</label>
        </>
    }

    render() {
        let areas = ['shipping price']
        let components = {
            'shipping': this.shipping(),
            'price': this.price()
        }
        return <div className="card-thumbnail-price">
            <GridLayout areas={areas} components={components}
                        gridClass="card-thumbnail-grid"
                        itemClass="card-thumbnail-item"
            />
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
            <div className="card-thumbnail">
                <img className="card-thumbnail-image" alt="img" aria-hidden="true" src={this.state.imageUrl}/>
                <Price/>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardThumbnail);