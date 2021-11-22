import {createReview, deleteReview, fetchProducts} from "./products";

export const createUser = (user) => {
    return $.ajax({
        url: '/api/users',
        method: 'POST',
        data: { user: user }
    });
};


export const createSession = (user) => {
    return $.ajax({
        url: '/api/session',
        method: 'POST',
        data: { user: user }
    });
};

export const deleteSession = () => {
    return $.ajax({
        url: '/api/session',
        method: 'DELETE'
    });
};


window.createUser = createUser;
window.createSession = createSession;
window.deleteSession = deleteSession;