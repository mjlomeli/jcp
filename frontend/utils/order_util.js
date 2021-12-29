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

export const updateOrder = (order) => {
    return $.ajax({
        url: `/api/orders/${order.id}`,
        method: 'PATCH',
        data: {order: order}
    });
};

export const deleteOrder = (orderId) => {
    return $.ajax({
        url: `/api/orders/${orderId}`,
        method: 'DELETE'
    });
};

window.OrderUtil = {
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    deleteOrder
}

