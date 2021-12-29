import {debug} from "./tools";

export const fetchShops = () => {
    return $.ajax({
        url: '/api/shops',
        method: 'GET'
    });
};

export const fetchShop = (shopId) => {
    if (!shopId) {
        return debug.error(`A shop id must be provided for fetchShop.`)
    }

    return $.ajax({
        url: `/api/shops/${shopId}`,
        method: 'GET'
    });
};

export const createShop = (shop) => {
    if (!shop) {
        return debug.error(`A shop object must be provided for createShop.`)
    }

    return $.ajax({
        url: '/api/shops',
        method: 'POST',
        data: {shop: shop}
    });
};

export const updateShop = (shop) => {
    if (!shop) {
        return debug.error(`A shop object must be provided for updateShop.`)
    }

    return $.ajax({
        url: `/api/shops/${shop.id}`,
        method: 'PATCH',
        data: {shop: shop}
    });
};

export const deleteShop = (shopId) => {
    if (!shopId) {
        return debug.error(`A shop id must be provided for deleteShop.`)
    }

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