import {connect} from 'react-redux';
import React from 'react';
import './cart_item.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});


class PaymentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {totalPrice: 116.58, totalDiscount: 4.8, paymentType: "creditcard", creditCardFee: 0.05,
            onlinePaymentFee: 0.02, installmentFee: 0.01}
    }

    paymentTypes(){
        return <div className="payment-types-checkout">
            <div className="payment-type-radio payment-type-creditcards">
                <input type="radio" value="CreditCard" name="paymentType" />
                <span className="payment-checkmark" />
                <GridLayout areas={['mastercard visa americanexpress discover']}
                            components={{
                                'mastercard': <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png" alt="mastercard" />,
                                'visa': <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png" alt="visa" />,
                                'americanexpress': <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/601px-American_Express_logo_%282018%29.svg.png" alt="americanexpress" />,
                                'discover': <img src="https://brandeps.com/logo-download/D/Discover-Card-logo-vector-01.svg" alt="discover" />}}
                            gridClass="payment-types-creditcards-grid"
                            itemClass="payment-types-creditcards-items"
                />
            </div>
            <div className="payment-type-radio payment-type-onlinepayment">
                <input type="radio" value="OnlinePayment" name="paymentType" />
                <span className="payment-checkmark" />
                <img src="http://logosvg.com/wp-content/uploads/PayPal_logo.svg" alt="onlinePayment" />
            </div>
            <div>
                <div className="payment-type-radio payment-type-klarna">
                    <input type="radio" value="Installment" name="paymentType" />
                    <span className="payment-checkmark" />
                    <img src="https://bobatoo.co.uk/wp-content/uploads/2020/01/Klarna-Logo.jpg" alt="installment" />
                </div>
                <label>Pay in 4 installments.</label>
            </div>
        </div>
    }

    calculation(){
        return <>
            <div className="payment-checkout-price-item">
                <label>Items(s) total</label>
                <label>${this.state.totalPrice}</label>
            </div>
            <div className="payment-checkout-price-item">
                <label>Shop Discount</label>
                <label>-${this.state.totalPrice}</label>
            </div>
            <div className="payment-checkout-price-total">
                <label>Subtotal</label>
                <label>${this.state.totalPrice - this.state.totalDiscount}</label>
            </div>
        </>
    }

    render(){
        return <form className="payment-checkout-form">
            {this.paymentTypes()}
            {this.calculation()}
            <button className="payment-checkout-submit">Proceed to checkout</button>
        </form>
    }
}

class Additional extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shipping(){
        return <>
            <div className="card-featured-additional">
                <label className="card-featured-additional-label">FREE shipping</label>
            </div>
        </>
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
        // TODO: send to product page
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

    renderPrice() {
        return <>
            <div className="card-featured-price-container">
                {this.calculatedPrice()}
                <label className="card-featured-price-mod">
                    {this.originalPrice()} {this.discounted()}
                </label>
            </div>
        </>
    }

    renderCartItem() {
        let areas = ['image rating', 'image title', 'image price', 'image button']
        let components = {
            'rating': <>
                <label className="card-featured-store">{this.state.storeName}</label>
                <Rating rating={4.6} disabled={true} classCount="card-featured-rating-count"/>
            </>,
            'image': <div className="card-list-image-div">
                <img className="card-featured-image" alt="img"
                     aria-hidden="true" src={this.state.imageUrl} />
            </div>,
            'title': <label className="card-featured-title">{this.resize(this.state.title)}</label>,
            'price': <div className="card-featured-grouped-price"><Price />
                <Additional /></div>,
            'button': <button className="card-featured-submit">
                <label className="card-featured-submit-label">Shop this item</label>
            </button>
        }
        return <GridLayout areas={areas}
                           components={components}
                           gridClass="card-featured-grid grid-test-featured"
                           itemClass="card-featured-items item-test-featured"
        />
    }

    render(){
        return <PaymentType />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);