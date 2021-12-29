export const fetchProducts = () => {
    return $.ajax({
        url: '/api/products',
        method: 'GET'
    });
};

export const fetchProductsRange = (start, end) => {
    return $.ajax({
        url: `/api/products?start=${start}&end=${end}`,
        method: 'GET'
    });
};

export const fetchRandomProductsRange = (start, end) => {
    return $.ajax({
        url: `/api/products?start=${start}&end=${end}&random=${true}`,
        method: 'GET'
    });
};

export const fetchProduct = (productId) => {
    return $.ajax({
        url: `/api/products/${productId}`,
        method: 'GET'
    });
};

export const createProduct = (product) => {
    return $.ajax({
        url: '/api/products',
        method: 'POST',
        data: {product: product}
    });
};

export const updateProduct = (product) => {
    return $.ajax({
        url: `/api/products/${product.id}`,
        method: 'PATCH',
        data: {product: product}
    });
};

export const deleteProduct = (productId) => {
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
