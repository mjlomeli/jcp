import {debug} from "./tools";

export const fetchProducts = () => {
    return $.ajax({
        url: '/api/products',
        method: 'GET'
    });
};

export const fetchProductsRange = (start, end) => {
    if (!start || !end) {
        debug.error(`A start and end must be provided for fetchProductsRange.`)
    }

    return $.ajax({
        url: `/api/products?start=${start}&end=${end}`,
        method: 'GET'
    });
};

export const fetchRandomProductsRange = (start, end) => {
    if (!start || !end) {
        debug.error(`A start and end must be provided for fetchRandomProductsRange.`)
    }

    return $.ajax({
        url: `/api/products?start=${start}&end=${end}&random=${true}`,
        method: 'GET'
    });
};

export const fetchProduct = (productId) => {
    if (!productId) {
        debug.error(`A product id must be provided for fetchProduct.`)
    }

    return $.ajax({
        url: `/api/products/${productId}`,
        method: 'GET'
    });
};

export const createProduct = (product) => {
    if (!product) {
        debug.error(`A product object must be provided for createProduct.`)
    }

    return $.ajax({
        url: '/api/products',
        method: 'POST',
        data: {product: product}
    });
};

export const updateProduct = (product) => {
    if (!product) {
        debug.error(`A product object be provided for updateProduct.`)
    }

    return $.ajax({
        url: `/api/products/${product.id}`,
        method: 'PATCH',
        data: {product: product}
    });
};

export const deleteProduct = (productId) => {
    if (!productId) {
        debug.error(`A product id must be provided for deleteProduct.`)
    }

    return $.ajax({
        url: `/api/products/${productId}`,
        method: 'DELETE'
    });
};

window.ProductUtil = {
    fetchProducts,
    fetchProductsRange,
    fetchRandomProductsRange,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
