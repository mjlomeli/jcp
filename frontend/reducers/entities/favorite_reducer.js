import {
    REMOVE_FAVORITE,
    RECEIVE_FAVORITES,
    CLEAR_ALL_FAVORITES
} from "../../actions/favorite_action";

export default function reducerFavorites(prevState=new Set([]), action){
    Object.freeze(prevState);
    let newState = new Set([...prevState])
    switch(action.type){
        case RECEIVE_FAVORITES:
            action.productIds.forEach(productId => newState.add(parseInt(productId)));
            return newState;
        case REMOVE_FAVORITE:
            newState.delete(parseInt(action.productId));
            return newState;
        case CLEAR_ALL_FAVORITES:
            return new Set([]);
        default:
            return prevState
    }
}