import * as ProductUtil from '../utils/product_util'

export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const RECEIVE_PRODUCT_ERROR = "RECEIVE_PRODUCT_ERROR";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const receiveProducts = products =>({
    type: RECEIVE_PRODUCTS,
    products: products
})

const receiveProduct = product =>({
    type: RECEIVE_PRODUCT,
    product: product
})

const removeProduct = productId =>({
    type: REMOVE_PRODUCT,
    productId: productId
})

const receiveProductError = errors =>({
    type: RECEIVE_PRODUCT_ERROR,
    errors: errors
})


/*    Separation      */


export const fetchProducts = () => dispatch =>(
    ProductUtil.fetchProducts().then(
        products => {
            return dispatch(receiveProducts(products))
        },
        err => dispatch(receiveProductError(err.responseJSON))
    )
)

export const fetchProductsRange = (start, end) => dispatch =>(
    ProductUtil.fetchProductsRange(start, end).then(
        products => dispatch(receiveProducts(products)),
        err => dispatch(receiveProductError(err.responseJSON))
    )
)

export const fetchRandomProductsRange = (start, end) => dispatch =>(
    ProductUtil.fetchRandomProductsRange(start, end).then(
        products => dispatch(receiveProducts(products)),
        err => dispatch(receiveProductError(err.responseJSON))
    )
)

export const fetchProduct = productId => (dispatch) => {
    return ProductUtil.fetchProduct(productId).then(
        product => dispatch(receiveProduct(product)),
        err => dispatch(receiveProductError(err.responseJSON))
    )
}

export const createProduct = product => dispatch =>(
    ProductUtil.createProduct(product).then(
        product => dispatch(receiveProduct(product)),
        err => dispatch(receiveProductError(err.responseJSON))
    )
)

export const updateProduct = product => dispatch =>(
    ProductUtil.updateProduct(product).then(
        product => dispatch(receiveProduct(product)),
        err => dispatch(receiveProductError(err.responseJSON))
    )
)

export const deleteProduct = productId => dispatch =>(
    ProductUtil.deleteProduct(productId).then(
        product => dispatch(removeProduct(product.id)),
        err => dispatch(receiveProductError(err.responseJSON))
    )
)

window.ProductAction = {
    fetchProduct,
    fetchProducts,
    fetchProductsRange,
    fetchRandomProductsRange,
    createProduct,
    updateProduct,
    deleteProduct
}