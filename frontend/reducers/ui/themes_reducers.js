const defaultThemeReducer = {
    bodyTemplate: {},
    cartTemplate: {},
    collections: {},
    footer: {},
    headerTemplate: {},
    productTemplate: {},
    productsTemplate: {},
}

import {
    RECEIVE_THEME
} from "../../actions/ui_theme_actions";


export default function ThemeReducer(prevState=defaultThemeReducer, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_THEME:
            newState[action.reducer][action.id] = action.ui;
            return newState;
        default:
            return newState
    }
}