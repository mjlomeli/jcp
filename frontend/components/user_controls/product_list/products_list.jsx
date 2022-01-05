import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";
import {fetchProducts, fetchProduct, fetchProductsRange, fetchRandomProducts} from "../../../actions/product_action";
import {debug} from "../../../utils/tools";

const mapStateToProps = (state, ownProps) =>{
    let products = state.entities.products
    return {
        //errors: errors.session, // need to add a ui or user_control errors
        products: state.entities.products
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

    componentDidMount() {

    }

    render() {
        if (!this.props.productId)
        if (!this.props.products)
            return null;

        let components = Object.entries(this.props.products).map(pair => {
            let [productId, product] = pair;
            console.log(pair)
            return <CardListing listing={product}/>
        });
        return <FlowLayout components={components || defaultComponents}
                           maxColumns={this.props.maxColumns || 4}
                           classGrid={this.classGrid}
                           classElements={this.classElements}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);