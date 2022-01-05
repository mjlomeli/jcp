import * as ProductUtil from '../utils/product_util'

export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const RECEIVE_PRODUCT = "RECEIVE_PRODUCT";
export const RECEIVE_PRODUCT_ERROR = "RECEIVE_PRODUCT_ERROR";
export const RECEIVE_PRODUCTS_ERROR = "RECEIVE_PRODUCTS_ERROR";
export const RESET_PRODUCT_ERROR = "RESET_PRODUCT_ERROR";
export const RESET_PRODUCTS_ERROR = "RESET_PRODUCTS_ERROR";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";


export const receiveProducts = products =>({
    type: RECEIVE_PRODUCTS,
    products: products
})

export const receiveProduct = product =>({
    type: RECEIVE_PRODUCT,
    product: product
})

export const removeProduct = productId =>({
    type: REMOVE_PRODUCT,
    productId: productId
})

export const receiveProductError = (productId, errors) =>({
    type: RECEIVE_PRODUCT_ERROR,
    productId: productId,
    errors: errors
})

export const receiveProductsError = errors =>({
    type: RECEIVE_PRODUCTS_ERROR,
    errors: errors
})


/*    Separation      */


export const fetchProducts = ({id, ids, product_id, product_ids, shop_id, shop_ids,
                                  user_id, start, end, random, limit, tag, material, taxonomy_path,
                                  tags, materials, taxonomy_paths, price_min, price_max,
                                  views_lowest, views_highest}) => dispatch =>(
    ProductUtil.fetchProducts({id, ids, product_id, product_ids, shop_id, shop_ids,
        user_id, start, end, random, limit, tag, material, taxonomy_path,
        tags, materials, taxonomy_paths, price_min, price_max,
        views_lowest, views_highest}).then(
        products => dispatch(receiveProducts(products)),
        err => dispatch(receiveProductsError(err.responseJSON))
    )
)


export const fetchProductsRange = (start, end) => dispatch =>(
    ProductUtil.fetchProductsRange(start, end).then(
        products => dispatch(receiveProducts(products)),
        err => dispatch(receiveProductsError(err.responseJSON))
    )
)


export const fetchRandomProducts = (limit) => dispatch =>(
    ProductUtil.fetchRandomProducts(limit).then(
        products => dispatch(receiveProducts(products)),
        err => dispatch(receiveProductsError(err.responseJSON))
    )
)


export const fetchRandomProductsRange = (start, end) => dispatch =>(
    ProductUtil.fetchRandomProductsRange(start, end).then(
        products => dispatch(receiveProducts(products)),
        err => dispatch(receiveProductsError(err.responseJSON))
    )
)

export const fetchProduct = productId => (dispatch) => {
    return ProductUtil.fetchProduct(productId).then(
        product => dispatch(receiveProduct(product)),
        err => dispatch(receiveProductError(productId, err.responseJSON))
    )
}

export const createProduct = product => dispatch =>(
    ProductUtil.createProduct(product).then(
        product => dispatch(receiveProduct(product)),
        err => dispatch(receiveProductError(product.id, err.responseJSON))
    )
)

export const updateProduct = product => dispatch =>(
    ProductUtil.updateProduct(product).then(
        product => dispatch(receiveProduct(product)),
        err => dispatch(receiveProductError(product.id, err.responseJSON))
    )
)

export const deleteProduct = productId => dispatch =>(
    ProductUtil.deleteProduct(productId).then(
        product => dispatch(removeProduct(product.id)),
        err => dispatch(receiveProductError(productId, err.responseJSON))
    )
)

export const resetProductError = productId => dispatch =>(
    dispatch({type: RESET_PRODUCT_ERROR, productId: productId})
)

export const resetProductsError = () => dispatch =>(
    dispatch({type: RESET_PRODUCTS_ERROR})
)

window.ProductAction = {
    fetchProduct,
    fetchProducts,
    fetchProductsRange,
    fetchRandomProducts,
    fetchRandomProductsRange,
    resetProductError,
    resetProductsError,
    createProduct,
    updateProduct,
    deleteProduct
}