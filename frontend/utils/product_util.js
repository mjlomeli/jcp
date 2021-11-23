export const fetchProducts = () => {
    return $.ajax({
        url: '/api/products',
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

export const updateProducts = (product) => {
    return $.ajax({
        url: `/api/products/${product.id}`,
        method: 'PATCH',
        data: {product: product}
    });
};

export const deleteProducts = (productId) => {
    return $.ajax({
        url: `/api/products/${productId}`,
        method: 'DELETE'
    });
};

