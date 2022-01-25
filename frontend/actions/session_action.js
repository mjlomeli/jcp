import * as SessionAPIUtil from '../utils/session';
import * as AlertAction from './alert_action'
import * as ModalAction from './ui_modal_action';
import * as FavoriteAction from './favorite_action';
import * as ReviewAction from './review_action';
import * as CartItemAction from './cart_item_action';

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
            dispatch(ReviewAction.fetchUserReviews(parseInt(user.id)));
            dispatch(receiveSession(user.id));
            dispatch(receiveUser(user));
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveErrors(err.responseJSON));
        }
    )
)

export const deleteSession = () => (dispatch, getState) => {
    let userId = getState().session.id;
    let user = getState().entities.user;
    return SessionAPIUtil.deleteSession().then(
        user => {
            if (userId === 1) {
                dispatch(AlertAction.caution(user.demo));
                dispatch(FavoriteAction.silentDeleteAllFavorites(userId));
                dispatch(CartItemAction.silentDeleteAllCartItems(userId));
            } else
                dispatch(AlertAction.notification(user.message));
            dispatch(FavoriteAction.clearAllFavorites());
            dispatch(CartItemAction.clearAllCartItems())
            dispatch(removeSession());
            return dispatch(removeUser());
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveErrors(err.responseJSON))
        }
    )
}

window.SessionAction = {
    createUser,
    createSession,
    deleteSession
}