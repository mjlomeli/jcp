import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";
import {fetchProducts, fetchProduct, fetchProductsRange, fetchRandomProducts} from "../../../actions/product_action";
import {debug} from "../../../utils/tools";

const mapStateToProps = (state, ownProps) =>{
    let productIds = ownProps.productIds || null;
    return {
        productIds: productIds
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsRange: (start, end) => dispatch(fetchProductsRange(start, end)),
    fetchRandomProducts: (limit) => dispatch(fetchRandomProducts(limit))
});


/* defaults */
const defaultComponents = Array(17).fill(<CardListing />);

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        debug.func("ProductsList", `props.products = ${this.props.products}`)
        this.state = {}

        this.classGrid = `global-products-list-grid ${props.className || props.classGrid || ""}`;
        this.classElements = `global-products-list-items ${props.className || props.classElements || ""}`;
    }

    isRenderValid() {
        return this.props.productIds && this.props.productIds.length;
    }

    resolve() {
        if (!this.props.productIds || this.props.productIds.length === 0)
            this.props.fetchRandomProducts(10);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();


        let components = this.props.productIds.map(productId => {
            let product = Product.findById(productId);
            let images = product.imagesSmall();
            return <CardListing productId={productId} product={product} images={images}/>
        });
        return <FlowLayout components={components || defaultComponents}
                           maxColumns={this.props.maxColumns || 4}
                           classGrid={this.classGrid}
                           classElements={this.classElements}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);