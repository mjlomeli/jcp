export const fetchUsers = () => {
    return $.ajax({
        url: '/api/users',
        method: 'GET'
    });
};

export const fetchUser = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}`,
        method: 'GET'
    });
};

export const createUser = (user) => {
    return $.ajax({
        url: '/api/users',
        method: 'POST',
        data: {user: user}
    });
};

export const updateUsers = (user) => {
    return $.ajax({
        url: `/api/users/${user.id}`,
        method: 'PATCH',
        data: {user: user}
    });
};

export const deleteUsers = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}`,
        method: 'DELETE'
    });
};
