import * as FavoriteUtil from '../utils/favorite_util'
import * as AlertAction from './alert_action'

export const RECEIVE_FAVORITES = "RECEIVE_FAVORITES";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const CLEAR_ALL_FAVORITES = "CLEAR_ALL_FAVORITES";

export const RECEIVE_FAVORITE_ERROR = "RECEIVE_FAVORITE_ERROR";
export const RECEIVE_FAVORITES_ERROR = "RECEIVE_FAVORITES_ERROR";
export const RESET_FAVORITE_ERROR = "RESET_FAVORITE_ERROR";
export const RESET_FAVORITES_ERROR = "RESET_FAVORITES_ERROR";


const receiveFavorites = productIds =>({
    type: RECEIVE_FAVORITES,
    productIds: productIds
})

const removeFavorite = productId =>({
    type: REMOVE_FAVORITE,
    productId: productId
})

const receiveFavoriteError = (productId, errors) =>({
    type: RECEIVE_FAVORITE_ERROR,
    productId: productId,
    errors: errors
})

export const receiveFavoritesError = errors =>({
    type: RECEIVE_FAVORITES_ERROR,
    errors: errors
})


/*    Separation      */


export const fetchFavorites = (user_id) => dispatch => (
    FavoriteUtil.fetchFavorites(user_id).then(
        productIds => dispatch(receiveFavorites(productIds)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveFavoritesError(err.responseJSON))
        }
    )
)

export const hasFavorite = productId => (dispatch, getState) => (
    getState().entities.favorites.has(productId)
)

export const createFavorite = (userId, productId) => dispatch =>(
    FavoriteUtil.createFavorite(userId, productId).then(
        productIds => {
            dispatch(AlertAction.notification("It has been saved for you."));
            dispatch(receiveFavorites(productIds))
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveFavoriteError(productId, err.responseJSON))
        }
    )
)

export const deleteFavorite = (userId, productId) => dispatch =>(
    FavoriteUtil.deleteFavorite(userId, productId).then(
        favorite => {
            dispatch(AlertAction.notification("It was removed from your favorites."));
            dispatch(removeFavorite(productId))
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveFavoriteError(productId, err.responseJSON))
        }
    )
)

export const clearAllFavorites = () => dispatch => (
    dispatch({type: CLEAR_ALL_FAVORITES})
)

export const resetFavoriteError = productId => dispatch =>(
    dispatch({type: RESET_FAVORITE_ERROR, productId: productId})
)

export const resetFavoritesError = () => dispatch =>(
    dispatch({type: RESET_FAVORITES_ERROR})
)


window.FavoriteAction = {
    fetchFavorites,
    hasFavorite,
    resetFavoritesError,
    resetFavoriteError,
    createFavorite,
    deleteFavorite,
    clearAllFavorites
}