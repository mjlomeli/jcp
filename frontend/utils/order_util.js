export const fetchOrders = () => {
    return $.ajax({
        url: '/api/orders',
        method: 'GET'
    });
};

export const fetchOrder = (orderId) => {
    return $.ajax({
        url: `/api/orders/${orderId}`,
        method: 'GET'
    });
};

export const createOrder = (order) => {
    return $.ajax({
        url: '/api/orders',
        method: 'POST',
        data: {order: order}
    });
};

export const updateOrders = (order) => {
    return $.ajax({
        url: `/api/orders/${order.id}`,
        method: 'PATCH',
        data: {order: order}
    });
};

export const deleteOrders = (orderId) => {
    return $.ajax({
        url: `/api/orders/${orderId}`,
        method: 'DELETE'
    });
};

window.fetchOrders = fetchCartItems;
window.fetchOrder = fetchOrder;
window.createOrder = createOrder;
window.updateOrder = updateOrder;
window.deleteOrder = deleteOrder;