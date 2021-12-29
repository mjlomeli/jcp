export const fetchShops = () => {
    return $.ajax({
        url: '/api/shops',
        method: 'GET'
    });
};

export const fetchShop = (shopId) => {
    return $.ajax({
        url: `/api/shops/${shopId}`,
        method: 'GET'
    });
};

export const createShop = (shop) => {
    return $.ajax({
        url: '/api/shops',
        method: 'POST',
        data: {shop: shop}
    });
};

export const updateShop = (shop) => {
    return $.ajax({
        url: `/api/shops/${shop.id}`,
        method: 'PATCH',
        data: {shop: shop}
    });
};

export const deleteShop = (shopId) => {
    return $.ajax({
        url: `/api/shops/${shopId}`,
        method: 'DELETE'
    });
};


window.ShopUtil = {
    fetchShops,
    fetchShop,
    createShop,
    updateShop,
    deleteShop
}