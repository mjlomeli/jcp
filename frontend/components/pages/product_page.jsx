/**
 * Product_page
 *
 * Creates the product_template show page. It needs a productId
 * to begin.
 */


import {connect} from 'react-redux';
import React from 'react';
import './product_page.css'
import GridLayout from "../user_controls/grid_layout/grid_layout";
import {fetchProductListing, fetchRandomProducts} from "../../actions/product_action";
import Gallery from "../user_controls/gallery/gallery";
import {Product} from "../../lib/product";
import {urlId} from "../../utils/tools";
import Reviews from "../themes/reviews/reviews";
import Rating from "../user_controls/rating/rating";
import {createCartItem} from "../../actions/cart_item_action";
import {createLogin} from "../../actions/ui_modal_action";

const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId);
    let images = product && product.imagesSmall();
    let recommendations = Object.keys(state.entities.products).slice(0, 6);
    let userId = state.session.id;

    return {
        productId: productId,
        product: product,
        images: images,
        recommendations: recommendations,
        userId: userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (productId) => dispatch(fetchProductListing(productId)),
        fetchRandomProducts: n => dispatch(fetchRandomProducts(n)),
        createCartItem: (userId, productId, quantity) => dispatch(createCartItem({product_id: productId, user_id: userId, quantity: quantity})),
        createLogin: () => dispatch(createLogin())
    }
};

class ProductPage extends React.Component {
    /** Creates a product_template show page.
     * @param {Object} props                - The inputs passed to the components
     * @property {Object} state             - The data of the product_template having product_template: Object.
     * @property {Object} onclick           - The onclick listener.
     * @property {Function} fetchProduct    - Gets the product_template if the productId is provided.
     * @type {(product_template: Object=null, productId: number=null)  => Product}
     */
    constructor(props) {
        super(props);
        this.onclickaddtocart = this.onClickAddToCart.bind(this);
        this.onchangequantity = this.onChangeQuantity.bind(this);
        this.state = {quantity: 1};
    }

    onChangeQuantity(e){
        this.setState({quantity: e.target.value})
        console.log(e.target.value)
    }

    onClickAddToCart(){
        if (!this.props.userId){
            this.props.createLogin();
            return null;
        }
        this.props.createCartItem(this.props.userId, this.props.productId, this.state.quantity);
    }

    /** Action when the product_template page has the mouse enter.
     * @param {Object} e                - The inputs passed to the components
     * @type {(e: Event)  => VoidFunction}
     */
    onMouseEnter(e) {
        e.preventDefault();
    }


    /** Action when the product_template page has the mouse leave.
     * @param {Object} e                - The inputs passed to the components
     * @type {(e: Event)  => VoidFunction}
     */
    onMouseLeave(e) {
        e.preventDefault();
    }


    description(){
        return <div className="product-page-items-description">
            <h2>Description</h2>{
            this.props.product.description.replace(/(\\r\\n|\\n|\\r)/gm, "\n").replace(/(\\t)/gm, "\t").split("\n").map(
                (line, index) => <p key={index}>{line}</p>
            )
        }</div>
    }

    quantityComponent(){
        return <div className="product-page-quantity">
        <label>Quantity</label>
        <select id="quantity" name="quantity" onChange={this.onchangequantity}>
            {Array.from(Array(10)).map((v, idx) => <option key={`${idx+1}`} value={`${idx + 1}`}>{idx+1}</option>)}
        </select>
        </div>
    }

    options(){
        let discount = 0.05;
        let percentage = discount * 100 >> 0;
        let originalPrice = this.props.product.price || 0;
        let savings = originalPrice * discount;
        let price = originalPrice - savings;

        let areas = [
            'store store', 'review_count ratings',
            'title title', 'price price',
            'saving saving',
            'quantity quantity',
            'submit submit']
        let components = {
            'store': <h3>{this.props.product.store}</h3>,
            'review_count': <span>235 sales</span>,
            'ratings': <Rating rating={4.3} disabled={true}/>,
            'title': <h2 className="product-page-title">{this.props.product.title}</h2>,
            'price': <>
                <span className="product-page-price">${price.toFixed(2)}</span>
                <span className="product-page-discounted">${originalPrice.toFixed(2)}</span>
            </>,
            'saving': <span className="product-page-percentage-off">You save ${savings.toFixed(2)} ({percentage}% off)</span>,
            'quantity': this.quantityComponent(),
            'submit': <button onClick={this.onclickaddtocart} type="submit" className="product-page-items-options-submit">Add to cart</button>
        }

        return <GridLayout className="product-page-options-grid" areas={areas} components={components} />
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductId = this.props.productId;
        let postProductId = nextProps.productId;

        let preProduct = this.props.product;
        let postProduct = nextProps.product;

        let preUserId = this.props.userId;
        let postUserId = nextProps.userId;

        if (preProductId !== postProductId)
            return true;
        else if (!preProduct || !postProduct)
            return true;
        else if (preUserId !== postUserId)
            return true;
        return false;
    }

    /** Reponse if the current state is able to render with its current properties
     * @return {true | false} - The response if the current state is able to render with its current properties
     * @type {()  => true | false}
     */
    isRenderValid() {
        return !!this.props.product && !!this.props.images;
    }

    /** Tries to resolve any issues when the data isn't sufficient to render the page.
     * @return {null} - Returns null for shorthand ending in an if statement
     **/
    resolve() {
        if (!this.props.product) {
            this.props.fetchProduct(this.props.productId);
            this.props.fetchRandomProducts(6);
        }
        return null;
    }

    /** Renders the component
     * @returns {JSX.Element}
     */
    render() {
        if (!this.isRenderValid())
            return this.resolve();
        window.scrollTo(0, 0)
        let areas = [
            'gallery options',
            'details details',
            'review review'
        ]
        let components = {
            gallery: <Gallery productId={this.props.productId} />,
            options: this.options(),
            details: this.description(),
            review: <Reviews productId={this.props.productId}/>
        }
        return <div className="product-page-div" key={`product-page-${this.props.productId}`}>
            <GridLayout areas={areas} components={components}
                        className="product-page-grid" classElements="product-page-items" />
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)