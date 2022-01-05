import * as FavoriteUtil from '../utils/favorite_util'
import * as AlertAction from './alert_action'

export const RECEIVE_FAVORITES = "RECEIVE_FAVORITES";
export const RECEIVE_FAVORITE = "RECEIVE_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const RECEIVE_FAVORITE_ERROR = "RECEIVE_FAVORITE_ERROR";
export const RECEIVE_FAVORITES_ERROR = "RECEIVE_FAVORITES_ERROR";
export const RESET_FAVORITE_ERROR = "RESET_FAVORITE_ERROR";
export const RESET_FAVORITES_ERROR = "RESET_FAVORITES_ERROR";


const receiveFavorites = favorites =>({
    type: RECEIVE_FAVORITES,
    favorites: favorites
})

const receiveFavorite = productId =>({
    type: RECEIVE_FAVORITE,
    productId: productId
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
        favorites => dispatch(receiveFavorites(favorites)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveFavoritesError(err.responseJSON))
        }
    )
)

export const createFavorite = favorite => dispatch =>(
    FavoriteUtil.createFavorite(favorite).then(
        favorite => {
            dispatch(AlertAction.notification("It has been saved for you."));
            dispatch(receiveFavorite(favorite))
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveFavoriteError(favorite.id, err.responseJSON))
        }
    )
)

export const deleteFavorite = productId => dispatch =>(
    FavoriteUtil.deleteFavorite(productId).then(
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

export const resetFavoriteError = productId => dispatch =>(
    dispatch({type: RESET_FAVORITE_ERROR, productId: productId})
)

export const resetFavoritesError = () => dispatch =>(
    dispatch({type: RESET_FAVORITES_ERROR})
)


window.FavoriteAction = {
    fetchFavorites,
    resetFavoritesError,
    resetFavoriteError,
    createFavorite,
    updateFavorite,
    deleteFavorite
}