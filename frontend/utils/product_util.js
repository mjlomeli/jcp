import {debug} from "./tools";

export const fetchProducts = ({id, ids, product_id, product_ids, shop_id, shop_ids,
    user_id, start, end, random, limit, tag, material, taxonomy_path,
    tags, materials, taxonomy_paths, price_min, price_max,
    views_lowest, views_highest}) => {

    if (ids) ids = JSON.stringify(ids)
    if (product_ids) product_ids = JSON.stringify(product_ids)
    if (shop_ids) shop_ids = JSON.stringify(shop_ids)
    if (tags) tags = JSON.stringify(tags)
    if (materials) materials = JSON.stringify(materials)
    if (taxonomy_paths) taxonomy_paths = JSON.stringify(taxonomy_paths)

    return $.ajax({
        url: '/api/products',
        method: 'GET',
        data: {id, ids, product_id, product_ids, shop_id, shop_ids,
            user_id, start, end, random, limit, tag, material, taxonomy_path,
            tags, materials, taxonomy_paths, price_min, price_max,
            views_lowest, views_highest}
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
