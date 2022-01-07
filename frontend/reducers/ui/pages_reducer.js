import {RECEIVE_PAGE} from "../../actions/ui_page_actions";

export const defaultPageReducer = {
    cart: {},
    home: {},
    products: {},
    product: {},
}

export default function PageReducer(prevState=defaultPageReducer, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_PAGE:
            newState[action.reducer][action.id] = {...newState[action.reducer][action.id], ...action.ui};
            return newState;
        default:
            return prevState
    }
}