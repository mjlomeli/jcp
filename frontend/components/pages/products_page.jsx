import React from 'react';
import {fetchProductListing, fetchProducts, fetchRandomProducts} from "../../actions/product_action";
import {connect} from "react-redux";
import "./products_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import CardFeatured from "../user_controls/card_featured/card_featured";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import {queryToString, permitProductQuery} from "../../utils/tools";

const hasCachedQuery = (tags=[], materials=[], taxonomyPaths=[], query) => {
    let permitted = permitProductQuery(tags, materials, taxonomyPaths);
    let propsQuery = queryToString(permitted)
    return propsQuery in query;
}

const findProductIds = (ownProps, index, query_key, entities, isCachedQuery) => {
    if (ownProps.productIds && !isCachedQuery) {
        return ownProps.productIds;
    }
    else if (isCachedQuery && Object.keys(index.query).includes(query_key)) {
        let query_listings = index.query[query_key];
        let products = query_listings.products || {};
        return Object.keys(products);
    }
    return [];
}

const mapStateToProps = ({entities, errors, index}, ownProps) => {
    let params = new URLSearchParams(ownProps.location.search);
    let tag = params.get('tag');
    let tags = tag && [tag] || params.get('tags') || [];
    let material = params.get('material');
    let materials = material && [material] || params.get('materials') || [];
    let taxonomyPath = params.get('taxonomy_path');
    let taxonomyPaths = taxonomyPath && [taxonomyPath] || params.get('taxonomy_paths') || [];
    let isCachedQuery = hasCachedQuery(tags, materials, taxonomyPaths, index.query);
    let query = permitProductQuery(tags, materials, taxonomyPaths);
    let query_key = queryToString(query);
    let productIds = findProductIds(ownProps, index, query_key, entities, isCachedQuery);

    return {
        productIds: productIds.slice(1, 31) || [],
        recommendationIds: Object.keys(entities.products).slice(0,6) || [],
        featuredId: productIds[0] || null,
        query: query,
        isCachedQuery: isCachedQuery
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
    fetchProductListing: (productIds) => dispatch(fetchProductListing(productIds)),
    fetchProducts: query => dispatch(fetchProducts(query))
});

class ProductsPage extends React.Component {

    constructor(props) {
        super(props);
    }

    isRenderValid() {
        return this.props.productIds.length || this.props.isCachedQuery
    }

    resolve() {
        if (!this.props.isCachedQuery && Object.keys(this.props.query).length) {
            this.props.fetchProducts(this.props.query);
        }
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let components = {
            'featured': <CardFeatured productId={this.props.featuredId}/>,
            'products': <SelectionsFull productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds}/>
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