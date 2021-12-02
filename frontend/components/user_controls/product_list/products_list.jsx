import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";
import {fetchProducts, fetchProductsRange, fetchRandomProductsRange} from "../../../actions/product_actions";

const mapStateToProps = (state, ownProps) =>{
    let products = state.entities.products
    return {
        //errors: errors.session, // need to add a ui or user_control errors
        productsIds: products.list,
        products: products.all
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsRange: (start, end) => dispatch(fetchProductsRange(start, end)),
    fetchRandomProductsRange: (start, end) => dispatch(fetchRandomProductsRange(start, end))
});


/* defaults */
const defaultComponents = Array(17).fill(<CardListing />);

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.classGrid = `global-products-list-grid ${props.className || props.classGrid || ""}`;
        this.classItem = `global-products-list-items ${props.className || props.classItems || ""}`;
    }

    componentDidMount() {
        if (!this.props.productsIds || this.props.products) {
            this.props.fetchRandomProductsRange(this.props.start || 0, this.props.end || 20);
        }
    }

    render() {
        if (this.props.productsIds && !this.props.productsIds.length)
            return null;

        let components = this.props.productsIds.map(productId => {
            return <CardListing productId={productId} products={this.props.products} listing={this.props.products[productId]}/>
        });
        return <FlowLayout components={components || defaultComponents}
                           maxColumns={this.props.maxColumns || 4}
                           classGrid={this.classGrid}
                           classItems={this.classItem}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);