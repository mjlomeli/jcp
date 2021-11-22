import * as SessionAPIUtil from '../utils/session';

export const RECEIVE_USER = `RECEIVE_USER`;
export const REMOVE_SESSION = `REMOVE_SESSION`;
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user: user
})

const removeSession = () => ({
    type: REMOVE_SESSION
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
});





export const createUser = (user) => dispatch => (
    SessionAPIUtil.createUser(user).then(
        user => dispatch(receiveUser(user)),
        err => dispatch(receiveErrors(err.responseJSON))
    )
)

export const createSession = (user) => dispatch => (
    SessionAPIUtil.createSession(user).then(
        user => dispatch(receiveSession(user)),
        err => dispatch(receiveErrors(err.responseJSON))
    )
)

export const deleteSession = () => dispatch => (
    SessionAPIUtil.deleteSession().then(
        user => dispatch(removeSession()),
        err => dispatch(receiveErrors(err.responseJSON))
    )
)