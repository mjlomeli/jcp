/**
 * Product_page
 *
 * Creates the product_template show page. It needs a productId
 * to begin.
 */


import {connect} from 'react-redux';
import React from 'react';
import './product_template.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {fetchProductListing, fetchRandomProducts} from "../../../actions/product_action";
import Gallery from "../../user_controls/gallery/gallery";
import {Product} from "../../../lib/product";
import {urlId} from "../../../utils/tools";
import SelectionsCircular from "../selections_circular/selections_circular";
import Reviews from "../reviews/reviews";

const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId);
    let images = product && product.imagesSmall();
    let recommendations = Object.keys(state.entities.products).slice(0, 6);

    return {
        productId: productId,
        product: product,
        images: images,
        recommendations: recommendations
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProduct: (productId) => dispatch(fetchProductListing(productId)),
        fetchRandomProducts: n => dispatch(fetchRandomProducts(n))
    }
};

class ProductTemplate extends React.Component {
    /** Creates a product_template show page.
     * @param {Object} props                - The inputs passed to the components
     * @property {Object} state             - The data of the product_template having product_template: Object.
     * @property {Object} onclick           - The onclick listener.
     * @property {Function} fetchProduct    - Gets the product_template if the productId is provided.
     * @type {(product_template: Object=null, productId: number=null)  => Product}
     */
    constructor(props) {
        super(props);
        this.onclickproceedcheckout = this.onClickProceedCheckout.bind(this);
        this.onclickaddtocart = this.addToCart.bind(this);
    }

    onClickProceedCheckout(){

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
        return <div className="product-template-items-description">
            <h2>Description</h2>{
            this.props.product.description.replace(/(\\r\\n|\\n|\\r)/gm, "\n").replace(/(\\t)/gm, "\t").split("\n").map(
                (line, index) => <p key={index}>{line}</p>
            )
        }</div>
    }

    addToCart(e){
        e.preventDefault();
        //this.props.createCartItem(this.props.productId);
    }

    options(){
        return <div className="product-template-items-options">
            <h3>{this.props.product.store}</h3>
            <h2>{this.props.product.title}</h2>
            <h2>{this.props.product.price}</h2>
            <button onClick={this.onclickproceedcheckout} type="submit" className="product-template-items-options-submit">Proceed to checkout</button>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = Product.findIDFromProps(this.props);

        if (Product.hasError(productId)) {
            if (urlId(this.props) === productId) {
                this.props.history.push(`/card_listing/${Product.DEFAULT_ID}`);
                this.props.resetProductError(this.props.productId);
            } else {
                this.props.fetchProduct(Product.DEFAULT_ID);
            }
            return false;
        }
        return true;
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
        if (!Product.hasError(this.props.productId)) {
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
        let areas = [
            'gallery options',
            'details details'
        ]
        let components = {
            gallery: <Gallery productId={this.props.productId} />,
            options: this.options(),
            details: this.description()
        }
        return <><GridLayout areas={areas} components={components} className="product-template-grid" classElements="product-template-items" />
            <Reviews productId={this.props.productId}/>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTemplate)