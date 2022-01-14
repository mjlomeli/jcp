import React from "react";
import GridLayout from "../grid_layout/grid_layout";
import "./payment_selection.css"
import Selection from "./radio";
import {Product} from "../../../lib/product";
import {fetchProduct, resetProductErrors} from "../../../actions/product_action";
import {connect} from "react-redux";
import {notification} from "../../../actions/alert_action";

const mapStateToProps = (state, ownProps) =>{
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId)

    return {
        productId: productId,
        product: product
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    resetProductError: productId => dispatch(resetProductErrors(productId)),
    notification: message => dispatch(notification(message))
});


class PaymentSelection extends React.Component {
    constructor(props) {
        super(props);

        this.onclicksubmit = this.onClickSubmit.bind(this);
        this.discount = 0.05;
        this.quantity = 1;
        this.shipping = 0;
    }

    onClickSubmit(e){
        this.props.notification("This is only a demo. Thank you for taking the trial.");
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
        let price = this.props.product.price;
        let total = Math.round((price * this.quantity * 100) + Number.EPSILON) / 100 ;
        let discount = Math.round(price * this.quantity * this.discount  * 100) / 100;
        let nameTotal = <label className="payment-text-highlight payment-label">Items(s) total</label>
        let priceTotal = <label className="payment-text payment-price">${total.toFixed(2)}</label>

        let nameDiscount = <label className="payment-text-highlight payment-label">Shop Discount</label>
        let priceDiscount = <label className="payment-text payment-price">-${discount.toFixed(2)}</label>

        return <>
            {this.rowComponent(nameTotal, priceTotal)}
            {this.rowComponent(nameDiscount, priceDiscount)}
            <p className="payment-line-break"/>
        </>
    }

    feeCalculations() {
        let price = this.props.product.price;
        let total = price * this.quantity;
        let discount = Math.round((price * this.quantity * this.discount  * 100) + Number.EPSILON) / 100;
        let subtotal = Math.round((total - discount + Number.EPSILON) * 100) / 100;
        let nameSubtotal = <label className="payment-text payment-label">Subtotal</label>
        let priceSubtotal = <label
            className="payment-text payment-price">${subtotal.toFixed(2)}</label>
        let nameShipping = <label className="payment-text payment-label">Shipping</label>
        let priceShipping = <label className="payment-text payment-price">${this.shipping.toFixed(2)}</label>

        return <>
            {this.rowComponent(nameSubtotal, priceSubtotal)}
            {this.rowComponent(nameShipping, priceShipping)}
            <p className="payment-line-break"/>
        </>
    }

    totalCalculation() {
        let price = this.props.product.price;
        let total = price * this.quantity;
        let discount = Math.round(price * this.quantity * this.discount  * 100) / 100;
        let subtotal = total - discount;
        let charge = Math.round((subtotal + this.shipping + Number.EPSILON) * 100) / 100


        let nameTotal = <label className="payment-text-highlight payment-label">Total ({this.quantity} items)</label>
        let priceTotal = <label className="payment-text-highlight payment-price">${charge.toFixed(2)}</label>
        return this.rowComponent(nameTotal, priceTotal);
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = Product.findIDFromProps(this.props);
        if (Product.hasError(productId)) {
            this.props.history.push(`/payment_selection/${1}`);
            this.props.resetProductError(this.props.productId);
            return false;
        }
        return true;
    }

    isRenderValid(){
        return !!this.props.product;
    }

    resolve(){
        if (!this.props.product)
            this.props.fetchProduct(this.props.productId)
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let areas = ['radio', 'price', 'fee', 'total', 'button']
        let components = {
            'radio': this.paymentTypes(),
            'price': this.priceCalculations(),
            'fee': this.feeCalculations(),
            'total': this.totalCalculation(),
            'button': <button className="payment-checkout-submit" onClick={this.onclicksubmit}>Proceed to checkout</button>
        }
        return <GridLayout areas={areas} components={components} className="payment-checkout"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSelection);