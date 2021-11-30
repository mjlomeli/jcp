import {connect} from 'react-redux';
import React from 'react';
import './payment_type.css'
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


export default connect(mapStateToProps, mapDispatchToProps)(PaymentType);