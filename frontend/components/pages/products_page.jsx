import React from 'react';
import {fetchProducts} from "../../actions/product_action";
import {connect} from "react-redux";
import "./products_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import CardFeatured from "../user_controls/card_featured/card_featured";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import {queryToString, permitProductQuery} from "../../utils/tools";
import {fetchImages} from "../../actions/image_action";

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

const extractParams = (ownProps) => {
    let params = new URLSearchParams(ownProps.location.search);
    let tag = params.get('tag');
    let tags = tag && [tag] || params.get('tags') || [];
    let material = params.get('material');
    let materials = material && [material] || params.get('materials') || [];
    let taxonomyPath = params.get('taxonomy_path');
    let taxonomyPaths = taxonomyPath && [taxonomyPath] || params.get('taxonomy_paths') || [];
    return [tags, materials, taxonomyPaths]
}

const mapStateToProps = ({entities, errors, index}, ownProps) => {
    let [tags, materials, taxonomyPaths] = extractParams(ownProps);
    let isCachedQuery = hasCachedQuery(tags, materials, taxonomyPaths, index.query);
    let query = permitProductQuery(tags, materials, taxonomyPaths);
    let queryKey = queryToString(query);
    let productIds = findProductIds(ownProps, index, queryKey, entities, isCachedQuery);

    return {
        productIds: productIds.slice(1, 31) || [],
        recommendationIds: Object.keys(entities.products).slice(0,6) || [],
        featuredId: productIds[0] || null,
        query: query,
        queryKey: queryKey,
        isCachedQuery: isCachedQuery
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: query => dispatch(fetchProducts(query)),
    fetchImages: productIds => dispatch(fetchImages({product_ids: productIds}))
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
            'products': <SelectionsFull key={null} productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds}/>
        }
        let areas = ['featured', 'products', 'recommended']
        return <div key={this.props.queryKey} className="products-page-div">
            <GridLayout areas={areas}
                        components={components}
                        className="products-page-grid"
                        classElements="products-page-items"
            /></div>
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);