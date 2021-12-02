import {
    RECEIVE_USER_CONTROL
} from "../../actions/ui_user_control_actions";

export const defaultUserControlsReducer = {
    cardFeatured: {},
    cardListing: {},
    cardThumbnail: {},
    cartItem: {},
    circularThumbnail: {},
    flowLayout: {},
    gallery: {},
    gridLayout: {},
    navbar: {},
    paymentType: {},
    productList: {},
    rating: {},
    searchBar: {},
    viewLayout: {},
    product: {}
}

export default function UserControlsReducer(prevState=defaultUserControlsReducer, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_USER_CONTROL:
            newState[action.reducer][action.id] = {...newState[action.reducer][action.id], ...action.ui};
            return newState;
        default:
            return newState
    }
}