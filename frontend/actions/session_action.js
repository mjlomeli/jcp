import * as SessionAPIUtil from '../utils/session';
import * as AlertAction from './alert_action'
import * as ModalAction from './ui_modal_action';
import * as FavoriteAction from './favorite_action'

export const RECEIVE_USER = `RECEIVE_USER`;
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_SESSION = `RECEIVE_SESSION`;
export const REMOVE_SESSION = `REMOVE_SESSION`;
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

const receiveSession = (userId) => ({
    type: RECEIVE_SESSION,
    userId: userId
})

const removeSession = () => ({
    type: REMOVE_SESSION
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
});

const receiveUser = user =>({
    type: RECEIVE_USER,
    user: user
})

const removeUser = () =>({
    type: REMOVE_USER
})





export const createUser = (user) => dispatch => (
    SessionAPIUtil.createUser(user).then(
        user => {
            dispatch(ModalAction.deleteModal());
            dispatch(AlertAction.success("You have successfully created an account!"));
            dispatch(receiveUser(user));
            dispatch(receiveSession(user.id));
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveErrors(err.responseJSON))
        }
    )
)

export const createSession = (user) => dispatch => (
    SessionAPIUtil.createSession(user).then(
        user => {
            dispatch(ModalAction.deleteModal());
            if (user.email === "demo@email.com")
                dispatch(AlertAction.notification("You're logged in as a demo user."));
            else
                dispatch(AlertAction.success(`Welcome back ${user.firstName || user.email}!`));
            dispatch(FavoriteAction.fetchFavorites(parseInt(user.id)));
            dispatch(receiveSession(user.id));
            dispatch(receiveUser(user));
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveErrors(err.responseJSON));
        }
    )
)

export const deleteSession = () => dispatch => (
    SessionAPIUtil.deleteSession().then(
        user => {
            if ("demo" in user)
                dispatch(AlertAction.caution(user.demo));
            else
                dispatch(AlertAction.notification(user.message));
            dispatch(FavoriteAction.clearAllFavorites());
            dispatch(removeSession());
            dispatch(removeUser());
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveErrors(err.responseJSON))
        }
    )
)