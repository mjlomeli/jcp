import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";
import {fetchProducts, fetchProductsRange} from "../../../actions/product_actions";

const mapStateToProps = ({session, entities, errors}) =>{
    return {
        //errors: errors.session, // need to add a ui or user_control errors
        productsIds: entities.products.list
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

        let components = this.props.productsIds.map(productId => <CardListing productId={productId}/>);

        return <FlowLayout components={components || defaultComponents}
                           maxColumns={this.props.maxColumns || 4}
                           classGrid={this.classGrid}
                           classItems={this.classItem}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);