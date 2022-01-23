import React from 'react';
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom';
import {fetchProducts} from "../../actions/product_action";
import {connect} from "react-redux";
import "./products_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import CardFeatured from "../user_controls/card_featured/card_featured";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import {queryToString, permitProductQuery, extractParams} from "../../utils/tools";
import {fetchImages} from "../../actions/image_action";

const hasCachedQuery = (ownProps, index) => {
    let permitted = permitProductQuery(ownProps);
    let propsQuery = queryToString(permitted)
    return propsQuery in index.query;
}

const findProductIds = (ownProps, isCachedQuery, index) => {
    if (ownProps.productIds && !isCachedQuery)
        return ownProps.productIds;
    else if (isCachedQuery) {
        let query_key = queryToString(ownProps);
        return Object.keys(index.query[query_key].products);
    }
    return [];
}

const mapStateToProps = ({entities, errors, index}, ownProps) => {
    let isCachedQuery = hasCachedQuery(ownProps, index);
    let query = permitProductQuery(ownProps);
    let queryKey = queryToString(ownProps);
    let productIds = findProductIds(ownProps, isCachedQuery, index);
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
        if (!this.props.isCachedQuery && this.props.queryKey) {
            this.props.fetchProducts(this.props.query);
        }
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let components = {
            'featured': <div key={this.props.queryKey} className="products-page-featured"><CardFeatured productId={this.props.featuredId}/></div>,
            'products': <SelectionsFull key={this.props.queryKey} productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds}/>
        }
        let areas = ['featured', 'products', 'recommended']
        return <div key={this.props.queryKey} className="products-page-div">
            <GridLayout key={this.props.queryKey} areas={areas}
                        components={components}
                        className="products-page-grid"
                        classElements="products-page-items"
            /></div>
    }

}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsPage));