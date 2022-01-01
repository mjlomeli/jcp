import React from "react";
import GridLayout from "../grid_layout/grid_layout";
import "./payment_selection.css"
import Selection from "./radio";


class PaymentSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 116.58, totalDiscount: 4.8, paymentType: "creditcard", creditCardFee: 0.05,
            onlinePaymentFee: 0.02, installmentFee: 0.01, shippingPrice: 5.25, subtotalPrice: 99.99,
            numItems: 5
        }
    }

    paymentChoice(name, value, text = "", images = {}) {
        let components = Object.fromEntries(Object.entries(images).map(pair => {
            let [name, url] = pair;
            return [name, <img className="payment-selection-image" src={`${url}`} alt={name}/>]
        }))

        components.text = <label className="payment-text">{text}</label>
        let areas = [Object.keys(images).join(" ") + " text"]
        let gridComponents = <GridLayout areas={areas}
                                         components={components}
                                         className="payment-selection-radio-content-grid"
                                         classElements="payment-selection-radio-content-elements"/>

        return <Selection name={name} value={value} components={gridComponents}
                          className="payment-selection-radio"/>
    }


    paymentTypes() {
        let imageCreditCards = {
            'mastercard': "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png",
            'visa': "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png",
            'american_express': "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/601px-American_Express_logo_%282018%29.svg.png",
            'discover': "https://brandeps.com/logo-download/D/Discover-Card-logo-vector-01.svg"
        }

        let onlinePayment = {'paypal': "http://logosvg.com/wp-content/uploads/PayPal_logo.svg"}
        let other = {'klarna': "https://bobatoo.co.uk/wp-content/uploads/2020/01/Klarna-Logo.jpg"}
        let areas = ['creditcards', 'online', 'other'];
        let components = {
            'creditcards': this.paymentChoice("payment", "CreditCard", '', imageCreditCards),
            'online': this.paymentChoice("payment", "OnlinePayment", '', onlinePayment),
            'other': this.paymentChoice("payment", "Other", 'Pay in 4 installments.', other)
        }

        return <GridLayout areas={areas} components={components} className="payment-selection-radio-grid"
                           classElements="payment-selection-radio-elements"/>
    }

    rowComponent(name, price) {
        let areas = ['text price'];
        let components = {
            'text': name,
            'price': price
        }
        return <GridLayout areas={areas} components={components} className="payment-selection-price-grid"/>
    }

    priceCalculations() {
        let nameTotal = <label className="payment-text-highlight payment-label">Items(s) total</label>
        let priceTotal = <label className="payment-text payment-price">${this.state.totalPrice}</label>

        let nameDiscount = <label className="payment-text-highlight payment-label">Shop Discount</label>
        let priceDiscount = <label className="payment-text payment-price">-${this.state.totalPrice}</label>

        return <>
            {this.rowComponent(nameTotal, priceTotal)}
            {this.rowComponent(nameDiscount, priceDiscount)}
            <p className="payment-line-break"/>
        </>
    }

    feeCalculations() {
        let nameSubtotal = <label className="payment-text payment-label">Subtotal</label>
        let priceSubtotal = <label
            className="payment-text payment-price">${this.state.subtotalPrice - this.state.totalDiscount}</label>
        let nameShipping = <label className="payment-text payment-label">Shipping</label>
        let priceShipping = <label className="payment-text payment-price">${this.state.shippingPrice}</label>

        return <>
            {this.rowComponent(nameSubtotal, priceSubtotal)}
            {this.rowComponent(nameShipping, priceShipping)}
            <p className="payment-line-break"/>
        </>
    }

    totalCalculation() {
        let nameTotal = <label className="payment-text-highlight payment-label">Total ({this.state.numItems} items)</label>
        let priceTotal = <label className="payment-text-highlight payment-price">${this.state.totalPrice}</label>
        return this.rowComponent(nameTotal, priceTotal);
    }

    render() {
        let areas = ['radio', 'price', 'fee', 'total', 'button']
        let components = {
            'radio': this.paymentTypes(),
            'price': this.priceCalculations(),
            'fee': this.feeCalculations(),
            'total': this.totalCalculation(),
            'button': <button className="payment-checkout-submit">Proceed to checkout</button>
        }
        return <GridLayout areas={areas} components={components} className="payment-checkout"/>
    }
}

export default PaymentSelection;