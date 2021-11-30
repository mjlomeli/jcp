import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";
import {fetchProducts, fetchProductsRange} from "../../../actions/product_actions";

const mapStateToProps = ({session, entities, errors}) =>{
    return {
        //errors: errors.session, // need to add a ui or user_control errors
        products: entities.products
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsRange: (start, ending) => dispatch(fetchProductsRange(start, ending))
});

const defaultComponents = Array(17).fill(<CardListing />);

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: props.products, maxColumns: props.maxColumns || 4}

        this.classGrid = `global-products-list-grid ${props.className || props.classGrid || ""}`;
        this.classItem = `global-products-list-items ${props.className || props.classItems || ""}`;
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        if (this.state.products === undefined)
            return null;
        let components = Object.entries(this.state.products).map(pair => {
            let [id, contents] = pair;
            let imageUrls = JSON.parse(contents.imageUrls);
            return <CardListing title={contents.title} imageUrl={imageUrls[0]} price={contents.price}
                                store="StoreName" rating={4.6} ratingCount={100} discount={0} freeShipping={true} />
        })
        return <FlowLayout components={defaultComponents} maxColumns={this.state.maxColumns}
                           classGrid={this.classGrid} classItems={this.classItem}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);