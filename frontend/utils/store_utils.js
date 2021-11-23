export const fetchStores = () => {
    return $.ajax({
        url: '/api/stores',
        method: 'GET'
    });
};

export const fetchStore = (storeId) => {
    return $.ajax({
        url: `/api/stores/${storeId}`,
        method: 'GET'
    });
};

export const createStore = (store) => {
    return $.ajax({
        url: '/api/stores',
        method: 'POST',
        data: {store: store}
    });
};

export const updateStores = (store) => {
    return $.ajax({
        url: `/api/stores/${store.id}`,
        method: 'PATCH',
        data: {store: store}
    });
};

export const deleteStores = (storeId) => {
    return $.ajax({
        url: `/api/stores/${storeId}`,
        method: 'DELETE'
    });
};
