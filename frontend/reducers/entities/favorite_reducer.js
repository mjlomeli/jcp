import {
    RECEIVE_FAVORITE,
    REMOVE_FAVORITE,
    RECEIVE_FAVORITES
} from "../../actions/cart_item_action";

export default function FavoriteReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_FAVORITES:
            action.favorites.forEach(favorite =>{
                favorite.id = parseInt(favorite.id)
                newState[favorite.id] = favorite;
            })
            return newState;
        case RECEIVE_FAVORITE:
            action.favorite.id = parseInt(favorite.id);
            newState[action.favorite.id] = action.favorite;
            return newState;
        case REMOVE_FAVORITE:
            delete newState[parseInt(action.favoriteId)]
            return newState;
        default:
            return newState
    }
}