import React from 'react';
import {fetchProductListing, fetchRandomProducts} from "../../actions/product_action";
import {connect} from "react-redux";
import "./products_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import CardFeatured from "../user_controls/card_featured/card_featured";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";

const mapStateToProps = ({entities, errors}, ownProps) => {
    let productIds = Object.keys(entities.products);
    return {
        productIds: productIds,
        recommendationIds: productIds.slice(0, 25),
        featuredId: productIds[0]
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
    fetchProductListing: (productIds) => dispatch(fetchProductListing(productIds))
});

class ProductsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    isRenderValid() {
        return this.props.productIds && this.props.productIds.length;
    }

    resolve() {
        if (!this.props.productIds || this.props.productIds.length === 0)
            this.props.fetchRandomProducts(25);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let components = {
            'featured': <CardFeatured productId={this.props.featuredId} />,
            'products': <SelectionsFull productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds} />
        }
        let areas = ['featured', 'products', 'recommended']
        return <div className="products-page-div">
            <GridLayout areas={areas} components={components}
                           className="products-page-grid"
                           classElements="products-page-items"
        /></div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);