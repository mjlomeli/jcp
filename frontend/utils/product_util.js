import {debug} from "./tools";

export const fetchProducts = (query={}) => {
    if (query === null || typeof query !== 'object')
        return debug.errorPromise("ProductUtil.fetchProducts must be passed an object");
    if ('ids' in query) query.ids = JSON.stringify(query.ids)
    if ('product_ids' in query) query.product_ids = JSON.stringify(query.product_ids)
    if ('shop_ids' in query) query.shop_ids = JSON.stringify(query.shop_ids)
    if ('tags' in query) query.tags = JSON.stringify(query.tags)
    if ('materials' in query) query.materials = JSON.stringify(query.materials)
    if ('taxonomy_paths' in query) query.taxonomy_paths = JSON.stringify(query.taxonomy_paths)

    return $.ajax({
        url: '/api/products/query',
        method: 'GET',
        data: query
    });
};

export const fetchProductsRange = (start, end) => {
    if (!start || !end)
        return debug.errorPromise(`A start and end must be provided for ProductUtil.fetchProductsRange.`);

    return $.ajax({
        url: `/api/products/query`,
        method: 'GET',
        data: {start: start, end: end}
    });
};

export const fetchRandomProducts = (limit) => {
    if (!limit)
        return debug.errorPromise(`A limit be provided for ProductUtil.fetchRandomProducts.`)

    return $.ajax({
        url: `/api/products/query`,
        method: 'GET',
        data: {limit: limit, random: true}
    });
};

export const fetchProduct = (productId) => {
    if (!productId)
        return debug.errorPromise(`A product id must be provided for ProductUtil.fetchProduct.`)

    return $.ajax({
        url: `/api/product/${productId}`,
        method: 'GET'
    });
};

export const fetchProductListing = (productId, dimension='all') => {
    if (!productId)
        return debug.errorPromise(`A product id must be provided for ProductUtil.fetchProduct.`)

    return $.ajax({
        url: `/api/products/listings`,
        method: 'GET',
        data: {product_id: productId}
    });
};

export const createProduct = (product) => {
    if (!product)
        return debug.errorPromise(`A product object must be provided for ProductUtil.createProduct.`)

    return $.ajax({
        url: '/api/product',
        method: 'POST',
        data: {product: product}
    });
};

export const updateProduct = (product) => {
    if (!product)
        return debug.errorPromise(`A product object be provided for ProductUtil.updateProduct.`)

    return $.ajax({
        url: `/api/product/${product.id}`,
        method: 'PATCH',
        data: {product: product}
    });
};

export const deleteProduct = (productId) => {
    if (!productId)
        return debug.errorPromise(`A product id must be provided for ProductUtil.deleteProduct.`)

    return $.ajax({
        url: `/api/product/${productId}`,
        method: 'DELETE'
    });
};

window.ProductUtil = {
    fetchProducts,
    fetchProductsRange,
    fetchRandomProducts,
    fetchProduct,
    fetchProductListing,
    createProduct,
    updateProduct,
    deleteProduct
}
