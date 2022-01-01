import React from "react";
import GridLayout from "../grid_layout/grid_layout";
import "./payment_selection.css"


class Selection extends React.Component {
    static container = {
        display: "block",
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        paddingLeft: "35px",
        marginBottom: "12px",
        fontSize: "22px"
    }

    /* Hide the browser's default radio button */
    static input = {
        position: "absolute",
        opacity: "0",
        cursor: "pointer",
    }

    /* Create a custom radio button */
    static checkmark = {
        position: "absolute",
        top: "0",
        left: "0",
        height: "25px",
        width: "25px",
        backgroundColor: "#eee",
        borderRadius: "50%",
    }

    constructor(props) {
        super(props);
        this.className = props.className || '';
        this.classInput = props.classInput || '';
        this.classCheckmark = props.classCheckmark || '';

        this.name = props.name || null;
        this.value = props.value;
        this.checked = props.checked || null;

        this.container = React.createRef();
        this.input = React.createRef();
        this.checkmark = React.createRef();

        this.onmouseenter = this.onMouseEnter.bind(this);
        this.onmouseleave = this.onMouseLeave.bind(this);
        this.onchange = this.onChange.bind(this);
        this.onclick = this.onClick.bind(this);

        this.has = false;
    }

    onChange(e){
        console.log('hi')
        if (this.input.current.checked)
            this.checkmark.current.style.backgroundColor = "#2196F3";
        else
            this.checkmark.current.style.backgroundColor = "#ccc";
    }

    onMouseEnter(e) {
        if (!this.input.current.checked)
            this.checkmark.current.style.backgroundColor = "#ccc";
    }

    onMouseLeave(e) {
        if (!this.input.current.checked)
            this.checkmark.current.style.backgroundColor = "#eee";
    }

    onClick(e) {
        this.input.current.checked = !this.input.current.checked;
        if (this.input.current.checked)
            this.checkmark.current.style.backgroundColor = "#2196F3";
        else
            this.checkmark.current.style.backgroundColor = "#ccc";
    }


    render() {

        return <div className={this.className} ref={this.container} style={Selection.container}
                    onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} onClick={this.onclick}>
            <input className={this.classInput} ref={this.input} style={Selection.input} type="radio" name={this.name}
                   value={this.value} checked={this.checked} onChange={this.onchange}
            />
            <span className={this.classCheckmark} ref={this.checkmark} style={Selection.checkmark}/>
            <br/>
        </div>
    }
}


class PaymentSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 116.58, totalDiscount: 4.8, paymentType: "creditcard", creditCardFee: 0.05,
            onlinePaymentFee: 0.02, installmentFee: 0.01
        }
    }

    radio(value) {
        return <div>
            <Selection name="name"/>
            <Selection name="name"/>
        </div>
    }

    paymentChoice(value, text = "", images = {}) {
        let components = Object.fromEntries(Object.entries(images).map(pair => {
            let [name, url] = pair;
            return [name, <img className="payment-selection-image" src={`${url}`} alt={name}/>]
        }))

        return <div className="payment-selection-radio">
            {this.radio(value)}
            <GridLayout areas={[Object.keys(images).join(" ")]}
                        components={components}
                        className="payment-selection-image-grid"
                        classElements="payment-selection-image-elements"
            />
        </div>
    }


    paymentTypes() {
        let imageCreditCards = {
            'mastercard': "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png",
            'visa': "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png",
            'american_express': "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/601px-American_Express_logo_%282018%29.svg.png",
            'discover': "https://brandeps.com/logo-download/D/Discover-Card-logo-vector-01.svg"
        }

        return <div className="payment-types-checkout">
            {/*{this.paymentChoice("CreditCard", '', imageCreditCards)}*/}
            {this.radio("hi")}
            <div className="payment-selection-radio payment-selection-onlinepayment">
                <input type="radio" value="OnlinePayment" name="paymentType"/>
                <span className="payment-selection-checkmark"/>
                <img src="http://logosvg.com/wp-content/uploads/PayPal_logo.svg" alt="onlinePayment"/>
            </div>
            <div>
                <div className="payment-selection-radio payment-selection-klarna">
                    <input type="radio" value="Installment" name="paymentType"/>
                    <span className="payment-selection-checkmark"/>
                    <img src="https://bobatoo.co.uk/wp-content/uploads/2020/01/Klarna-Logo.jpg" alt="installment"/>
                </div>
                <label>Pay in 4 installments.</label>
            </div>
        </div>
    }

    calculation() {
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

    render() {
        return <form className="payment-checkout-form">
            {this.paymentTypes()}
            {this.calculation()}
            <button className="payment-checkout-submit">Proceed to checkout</button>
        </form>
    }
}

export default PaymentSelection;