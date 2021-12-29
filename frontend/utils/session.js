import {debug} from "./tools";

export const createSession = (user) => {
    if (!user){
        debug.error("A user must be given for createSession");
    }
    return $.ajax({
        url: '/api/session',
        method: 'POST',
        data: {user: user}
    });
};

export const deleteSession = () => {
    return $.ajax({
        url: '/api/session',
        method: 'DELETE'
    });
};

export const createUser = (user) => {
    if (!user){
        debug.error("A user must be given for createUser");
    }
    return $.ajax({
        url: '/api/users',
        method: 'POST',
        data: {user: user}
    });
};


window.SessionUtil = {
    createUser,
    createSession,
    deleteSession
}