import {connect} from 'react-redux';
import React from 'react';
import './card_featured.css'
import GridLayout from "../grid_layout/grid_layout";
import Rating from "../rating/rating";

const mapStateToProps = ({entities, session, errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_featured"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});


class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    calculatedPrice(){
        if (this.state.discount){
            let price = this.state.price - (this.state.price * this.state.discount);
            return <><label className="card-featured-calculated-price">${price.toFixed(2)}</label></>;
        }
    }

    discounted(){
        let percentage = (this.state.discount) ? this.state.discount * 100 >> 0 : 0
        if (percentage)
            return <><label className="card-featured-discount-price">({percentage}% off)</label></>
        return <></>
    }

    originalPrice(){
        return <label className="card-featured-original-price">${this.state.price}</label>
    }

    render() {
        return <>
            <div className="card-featured-price-container">
                {this.calculatedPrice()}
                <label className="card-featured-price-mod">
                    {this.originalPrice()}
                    {this.discounted()}
                </label>
            </div>
        </>
    }
}

class Additional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {freeShipping: props.freeShipping || false}
    }

    shipping(){
        return (this.state.freeShipping) ?
            <div className="card-featured-additional">
                <label className="card-featured-additional-label">FREE shipping</label>
            </div> :
            <></>;
    }

    recommendation(){
        return <>
            <div className="card-featured-additional">
            </div>
        </>
    }

    render() {
        return <>
            {this.shipping()}
        </>
    }
}


let defaultFeatured = {
    store: "ClarkandTaft",
    rating: 3.6,
    ratingCount: 2,
    title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
    discount: 0.5,
    price: 54.99,
    freeShipping: true
}

class CardFeatured extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            imageUrl: props.imageUrl,
            store: props.store,
            rating: props.rating || 0,
            ratingCount: props.ratingCount || 0,
            discount: props.discount || 0,
            price: props.price || 0,
            freeShipping: props.freeShipping || false
        }

        if (typeof this.state.title === "undefined")
            this.state = {...defaultFeatured};

        this.favoriteFill = React.createRef();
        this.onclickfavorite = this.onClickFavorite.bind(this);
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClickFavorite(e){
        //TODO: save product id to favorites
        this.favoriteFill.current.classList.toggle("card-featured-favored");
    }

    favoriteComponent(){
        return <div className="card-featured-favorite" onClick={this.onclickfavorite}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="51 166.5 510 459">
                <path d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153c43.391,2.685,84.259,21.312,114.75,52.301 c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153C561,464.544,348.101,625.5,306,625.5z M191.25,217.5 c-51.714,0-89.25,42.917-89.25,102c0,104.754,164.016,237.787,204,255c39.882-16.754,204-148.716,204-255 c0-59.083-37.536-102-89.25-102c-50.465,0-94.35,53.678-94.886,54.238L305.77,296.55l-19.763-24.989 C285.243,270.617,242.25,217.5,191.25,217.5z"/>
                <path ref={this.favoriteFill} fill="none" d="M306,625.5c-42.102,0-255-160.956-255-306c0-87.234,60.282-153,140.25-153 c43.391,2.685,84.259,21.312,114.75,52.301c30.548-30.907,71.383-49.519,114.75-52.301c79.968,0,140.25,65.766,140.25,153 C561,464.544,348.101,625.5,306,625.5z"/>
            </svg>
        </div>
    }

    resize(title){
        if (title.length > 200) {
            return `${title.slice(0, 72)}...`
        }
        return title;
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product_template page
    }

    render() {
        let infoAreas = ['rating', 'title', 'price', 'button']
        let infoComponents = {
            'rating': <>
                <label className="card-featured-store">{this.state.store}</label>
                <Rating rating={this.state.rating} count={this.state.ratingCount}
                        disabled={true} classCount="card-featured-rating-count"/>
                </>,
            'title': <label className="card-featured-title">{this.resize(this.state.title)}</label>,
            'price': <div className="card-featured-grouped-price">
                <Price price={this.state.price} discount={this.state.discount}/>
                <Additional freeShipping={this.state.freeShipping}/></div>,
            'button': <button className="card-featured-submit">
                <label className="card-featured-submit-label">Shop this item</label>
                </button>
        }

        let areas = ['image image info']
        let components = {
            'image': <div className="card-featured-image-div">
                {this.favoriteComponent()}
                <img className="card-featured-image" alt="img" aria-hidden="true" src={this.state.imageUrl} />
            </div>,
            'info': <GridLayout areas={infoAreas}
                                components={infoComponents}
                                classGrid="card-featured-info-grid"
                                classElements="card-featured-info-items"
            />
        }

        return <GridLayout areas={areas}
                           components={components}
                           classGrid="card-featured-grid"
                           classElements="card-featured-items"
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFeatured);