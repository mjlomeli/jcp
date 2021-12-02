const defaultTheme = {
    bodyTemplate: {},
    cartTemplate: {},
    collections: {},
    footer: {},
    headerTemplate: {},
    productTemplate: {},
    productsTemplate: {},
}

import {
    RECEIVE_THEME_UI
} from "../../actions/ui_theme_actions";


export default function UserControlsReducer(prevState=defaultTheme, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_UI:
            newState[action.uiid.reducer][action.uiid.id] = action.ui;
            return newState;
        default:
            console.debug("[UIProduct]: No case matched \n\t↳ frontend/reducers/products_error_reducer.js:17")
            return newState
    }
}