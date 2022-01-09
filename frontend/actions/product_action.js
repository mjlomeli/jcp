import * as ProductUtil from '../utils/product_util'
import * as AlertAction from './alert_action'
import {idSystemError} from "./alert_action";

export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const REMOVE_PRODUCTS = "REMOVE_PRODUCTS";

export const RECEIVE_PRODUCTS_ERRORS = "RECEIVE_PRODUCT_ERROR";
export const RECEIVE_PRODUCTS_GENERAL_ERRORS = "RECEIVE_PRODUCTS_GENERAL_ERRORS";

export const RESET_PRODUCTS_ERRORS = "RESET_PRODUCT_ERROR";
export const RESET_ALL_PRODUCTS_ERRORS = "RESET_ALL_PRODUCTS_ERRORS";


export const receiveProducts = listing => ({
    type: RECEIVE_PRODUCTS,
    listing: listing
})

export const removeProducts = productIds => ({
    type: REMOVE_PRODUCTS,
    productIds: productIds
})

export const receiveProductsErrors = (dispatch, errors) => {
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
        listing => dispatch(receiveProducts(listing)),
        err => {
            let keys = query && Object.keys(query) || [];
            let hasIds = id => ['id', 'ids', 'product_id', 'product_ids'].includes(id);
            if (keys.some(hasIds))
                return dispatch(receiveProductsErrors(dispatch, err.responseJSON))
            else
                return dispatch(receiveProductsGeneralErrors(err.responseJSON))
        }
    )
)


export const fetchProductsRange = (start, end) => dispatch => (
    ProductUtil.fetchProductsRange(start, end).then(
        listing => dispatch(receiveProducts(listing)),
        err => dispatch(receiveProductsGeneralErrors(dispatch, err.responseJSON)))
)


export const fetchRandomProducts = (limit) => dispatch => (
    ProductUtil.fetchRandomProducts(limit).then(
        listing => dispatch(receiveProducts(listing)),
        err => dispatch(receiveProductsErrors(dispatch, err.responseJSON)))
)


export const fetchRandomProductsRange = (start, end) => dispatch => (
    ProductUtil.fetchRandomProductsRange(start, end).then(
        listing => dispatch(receiveProducts(listing)),
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
    fetchProductsRange,
    fetchRandomProducts,
    fetchRandomProductsRange,
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