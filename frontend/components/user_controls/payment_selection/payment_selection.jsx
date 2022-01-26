import React from "react";
import GridLayout from "../grid_layout/grid_layout";
import "./payment_selection.css"
import Selection from "./radio";
import {Product} from "../../../lib/product";
import {fetchProductsListings} from "../../../actions/product_action";
import {connect} from "react-redux";
import {notification} from "../../../actions/alert_action";

const mapStateToProps = (state, ownProps) =>{
    let productIds = ownProps.productIds || [];
    let cartItems = state.entities.cartItems;
    let products = productIds.filter(id => !!Product.findById(id)).map(id => Product.findById(id));
    let isCached = products.length === productIds.length;
    let prices = products.reduce((nxt, product) => nxt + (product.price * cartItems[product.id].quantity), 0);
    let totals = Math.round((prices * 100) + Number.EPSILON) / 100 ;
    let discount = Math.round(prices * PaymentSelection.DISCOUNT  * 100) / 100;
    let subtotal = Math.round((totals - discount + Number.EPSILON) * 100) / 100;
    let charges = Math.round((subtotal + PaymentSelection.SHIPPING + Number.EPSILON) * 100) / 100;
    return {
        productIds: productIds,
        products: products,
        isCached: isCached,
        prices: prices,
        totals: totals,
        discount: discount,
        subtotal: subtotal,
        charges: charges
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: (productIds) => dispatch(fetchProductsListings(productIds)),
    notification: message => dispatch(notification(message))
});


class PaymentSelection extends React.Component {
    static DISCOUNT = 0.05;
    static SHIPPING = 0;
    static recentFetch = false;
    constructor(props) {
        super(props);

        this.onclicksubmit = this.onClickSubmit.bind(this);
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

        let onlinePayment = {'paypal': "https://s3.cointelegraph.com/storage/uploads/view/3278bdc14c74dd4e85732b776d0e5b1d.png"}
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
        let priceTotal = <label className="payment-text payment-price">${this.props.totals.toFixed(2)}</label>

        let nameDiscount = <label className="payment-text-highlight payment-label">Shop Discount</label>
        let priceDiscount = <label className="payment-text payment-price">-${this.props.discount.toFixed(2)}</label>

        return <>
            {this.rowComponent(nameTotal, priceTotal)}
            {this.rowComponent(nameDiscount, priceDiscount)}
            <p className="payment-line-break"/>
        </>
    }

    feeCalculations() {
        let nameSubtotal = <label className="payment-text payment-label">Subtotal</label>
        let priceSubtotal = <label
            className="payment-text payment-price">${this.props.subtotal.toFixed(2)}</label>
        let nameShipping = <label className="payment-text payment-label">Shipping</label>
        let priceShipping = <label className="payment-text payment-price">${PaymentSelection.SHIPPING.toFixed(2)}</label>

        return <>
            {this.rowComponent(nameSubtotal, priceSubtotal)}
            {this.rowComponent(nameShipping, priceShipping)}
            <p className="payment-line-break"/>
        </>
    }

    totalCalculation() {
        let nameTotal = <label className="payment-text-highlight payment-label">Total ({this.props.productIds.length} items)</label>
        let priceTotal = <label className="payment-text-highlight payment-price">${this.props.charges.toFixed(2)}</label>
        return this.rowComponent(nameTotal, priceTotal);
    }


    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     let preProductIds = this.props.productIds;
    //     let postProductIds = nextProps.productIds;
    //
    //     // console.log(!preProductIds || !postProductIds)
    //     // console.log(`${preProductIds.length} !== ${postProductIds.length} =>`, preProductIds.length != postProductIds.length)
    //     // console.log(`${preProductIds} === ${postProductIds} =>`, !preProductIds.every(preId => postProductIds.includes(preId)));
    //
    //     if (!preProductIds || !postProductIds)
    //         return true;
    //     else if (preProductIds.length !== postProductIds.length)
    //         return true;
    //     else if (preProductIds.every(preId => !postProductIds.includes(preId)))
    //         return true;
    //     return false;
    // }

    isRenderValid(){
        if (PaymentSelection.recentFetch && this.props.isCached) {
            PaymentSelection.recentFetch = false;
            return true;
        }
        return this.props.productIds.length && this.props.isCached;
    }

    resolve(){
        if (this.props.productIds.length && !PaymentSelection.recentFetch) {
            PaymentSelection.recentFetch = true;
            this.props.fetchProducts(this.props.productIds);
        }
        console.log(this.props.productIds);
        console.log(this.props.products);
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