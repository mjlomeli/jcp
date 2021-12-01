import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";
import {fetchProducts, fetchProductsRange} from "../../../actions/product_actions";

const mapStateToProps = (state, ownProps) =>{
    console.log("mapstate prdoucts list")
    console.log(state, ownProps)
    let products = state.entities.products
    console.log(products)
    return {
        //errors: errors.session, // need to add a ui or user_control errors
        productsIds: products.list,
        products: products.all
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsRange: (start, end) => dispatch(fetchProductsRange(start, end))
});


/* defaults */
const defaultComponents = Array(17).fill(<CardListing />);

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        console.log("products list constructor")
        console.log(props)
        this.state = {}

        this.classGrid = `global-products-list-grid ${props.className || props.classGrid || ""}`;
        this.classItem = `global-products-list-items ${props.className || props.classItems || ""}`;
    }

    componentDidMount() {
        this.props.fetchProductsRange(this.props.start || 0, this.props.end || 20);
    }

    render() {
        if (this.props.productsIds && !this.props.productsIds.length)
            return null;
        console.log("render products list")
        console.log(this.props)

        let components = this.props.productsIds.map(
            productId => <CardListing productId={productId} products={this.props.products} product={this.props.products[productId]}/>);
        console.log(components);
        return <FlowLayout components={components || defaultComponents}
                           maxColumns={this.props.maxColumns || 4}
                           classGrid={this.classGrid}
                           classItems={this.classItem}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);