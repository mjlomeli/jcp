import React from 'react';
import {
    Route,
    Redirect,
    withRouter, Link
} from 'react-router-dom';
import {fetchProducts, fetchProductsAsQuery} from "../../actions/product_action";
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
        return Object.keys(index.query[query_key].products).map(k => parseInt(k));
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
        isCachedQuery: isCachedQuery,
        tri: index.titles.tri,
        data: index.titles.data
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: query => dispatch(fetchProducts(query)),
    fetchProductsAsQuery: (ids, query) => dispatch(fetchProductsAsQuery(ids, query))
});

class ProductsPage extends React.Component {

    static productsKey = 0;
    constructor(props) {
        super(props);
    }

    noResultsComponent(){
        return <div className="cart-empty">
            <h2 className="cart-title">No search results were found.</h2>
            <Link to="/home">Discover something unique.</Link>
        </div>
    }

    isRenderValid() {
        return this.props.productIds.length || this.props.isCachedQuery
    }

    resolve() {
        if (!this.props.isCachedQuery && this.props.queryKey) {
            let query = this.props.query.query;
            let ids = this.props.tri.getLike(query.toLowerCase()).map(result => this.props.data[result].id)
            if (ids.length)
                this.props.fetchProductsAsQuery(ids, query);
        }
        return this.noResultsComponent();
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let productsKey = `${this.props.queryKey || ProductsPage.productsKey}`;
        console.log(productsKey)
        console.log(this.props.productIds);
        let components = {
            'featured': <div key={productsKey} className="products-page-featured"><CardFeatured key={productsKey} productId={this.props.featuredId}/></div>,
            'products': <SelectionsFull key={productsKey} productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular key={productsKey} productIds={this.props.recommendationIds}/>
        }
        let areas = ['featured', 'products', 'recommended'];
        return <div key={productsKey} className="products-page-div">
            <GridLayout key={productsKey} areas={areas}
                        components={components}
                        className="products-page-grid"
                        classElements="products-page-items" />
        </div>
    }

}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsPage));