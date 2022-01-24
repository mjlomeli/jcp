import * as ProductUtil from '../utils/product_util'
import * as AlertAction from './alert_action'
import {ENTITY} from "../reducers/constants";
import {parse_int_listings} from "../utils/tools";

export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const RECEIVE_PRODUCTS_TITLES = "RECEIVE_PRODUCTS_TITLES";
export const RECEIVE_PRODUCTS_AS_QUERY = "RECEIVE_PRODUCTS_AS_QUERY";
export const REMOVE_PRODUCTS = "REMOVE_PRODUCTS";

export const RECEIVE_PRODUCTS_ERRORS = "RECEIVE_PRODUCT_ERROR";
export const RECEIVE_PRODUCTS_GENERAL_ERRORS = "RECEIVE_PRODUCTS_GENERAL_ERRORS";

export const RESET_PRODUCTS_ERRORS = "RESET_PRODUCT_ERROR";
export const RESET_ALL_PRODUCTS_ERRORS = "RESET_ALL_PRODUCTS_ERRORS";


export const receiveProducts = (listings={}) => ({
    type: RECEIVE_PRODUCTS,
    listings: parse_int_listings(listings)
})

export const receiveProductsAsQuery = (listings, query) => ({
    type: RECEIVE_PRODUCTS_AS_QUERY,
    listings: {...parse_int_listings(listings), query: query}
})

export const receiveProductsTitles = (titles=[]) => ({
    type: RECEIVE_PRODUCTS_TITLES,
    titles: titles
})

export const receiveProductsListings = (listings={}) => ({
    type: ENTITY,
    listings: parse_int_listings(listings)
})



export const removeProducts = (productIds=[]) => ({
    type: REMOVE_PRODUCTS,
    productIds: productIds
})

export const receiveProductsErrors = (dispatch, errors=[]) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_PRODUCTS_ERRORS,
        errors: errors
    }
}

export const receiveProductsGeneralErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_PRODUCTS_GENERAL_ERRORS,
        errors: errors
    }
}


/*    Separation      */


export const fetchProducts = (query) => dispatch => (
    ProductUtil.fetchProducts(query).then(
        listing => dispatch(receiveProductsListings(listing)),
        err => {
            let keys = query && Object.keys(query) || [];
            let hasIds = id => ['id', 'ids', 'product_id', 'product_ids'].includes(id);
            if (keys.some(hasIds))
                return dispatch(receiveProductsErrors(dispatch, err.responseJSON))
            else
                return dispatch(receiveProductsGeneralErrors(dispatch, err.responseJSON))
        }
    )
)

export const fetchProductsTitles = () => dispatch => (
    ProductUtil.fetchProductsTitles().then(
        titles => dispatch(receiveProductsTitles(titles)),
        err => dispatch(AlertAction.systemError([err.responseJSON]))
    )
)

export const fetchProductsAsQuery = (productIds, query) => dispatch => (
    ProductUtil.fetchProductsListings(productIds).then(
        listings => dispatch(receiveProductsAsQuery(listings, {query: query})),
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const fetchProductListing = (productId) => dispatch => (
    ProductUtil.fetchProductListing(productId).then(
        listing => dispatch(receiveProductsListings(listing)),
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const fetchProductsListings = (productIds) => dispatch => (
    ProductUtil.fetchProductsListings(productIds).then(
        listings => dispatch(receiveProductsListings(listings)),
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)


export const fetchProductsRange = (start, end) => dispatch => (
    ProductUtil.fetchProductsRange(start, end).then(
        listing => dispatch(receiveProducts(listing)),
        err => dispatch(receiveProductsGeneralErrors(dispatch, err.responseJSON)))
)


export const fetchRandomProducts = (limit) => dispatch => (
    ProductUtil.fetchRandomProducts(limit).then(
        listing => dispatch(receiveProductsListings(listing)),
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const fetchProduct = productId => (dispatch) => {
    return ProductUtil.fetchProduct(productId).then(
        listing => dispatch(receiveProducts(listing)),
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
}

export const createProduct = product => dispatch => (
    ProductUtil.createProduct(product).then(
        listing => {
            dispatch(AlertAction.success("Your product has been created!"));
            dispatch(receiveProducts(listing))
        },
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const updateProduct = product => dispatch => (
    ProductUtil.updateProduct(product).then(
        listing => {
            dispatch(AlertAction.success("Changes have been saved."));
            dispatch(receiveProducts(listing))
        },
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const deleteProduct = productId => dispatch => (
    ProductUtil.deleteProduct(productId).then(
        productIds => {
            dispatch(AlertAction.caution("The item has been deleted."));
            dispatch(removeProducts(productIds))
        },
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const deleteProducts = productIds => dispatch => (
    ProductUtil.deleteProduct(productIds).then(
        productIds => {
            dispatch(AlertAction.caution("The item has been deleted."));
            dispatch(removeProducts(productIds))
        },
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)

export const fetchTabbeddItems = () => {
    Promise.resolve().then(_=> {
        fetchProducts({taxonomy_paths: ["Art & Collectibles"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Craft Supplies & Tools"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Books, Movies & Music"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Home & Living"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Home Decor"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Jewelry"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Toys & Games"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Kitchen & Dining"]})(store.dispatch);
        fetchProducts({taxonomy_paths: ["Drink & Barware"]})(store.dispatch);
    });
}

export const resetProductErrors = productId => dispatch => (
    dispatch({type: RESET_PRODUCTS_ERRORS, productIds: [productId]})
)

export const resetProductsErrors = productIds => dispatch => (
    dispatch({type: RESET_PRODUCTS_ERRORS, productIds: productIds})
)

export const resetAllProductsError = () => dispatch => (
    dispatch({type: RESET_ALL_PRODUCTS_ERRORS})
)

window.ProductAction = {
    fetchProduct,
    fetchProducts,
    fetchProductsTitles,
    fetchProductsRange,
    fetchRandomProducts,
    fetchProductListing,
    fetchProductsListings,
    fetchTabbeddItems,
    resetProductErrors,
    resetProductsErrors,
    resetAllProductsError,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProducts
}

window.ProductDispatchers = {
    receiveProducts,
    receiveProductsErrors,
    receiveProductsGeneralErrors,
    removeProducts
}