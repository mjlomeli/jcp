
import {
    RECEIVE_LOGIN,
    RECEIVE_REGISTER,
    REMOVE_MODAL,
    RECEIVE_MODAL_ERROR
} from "../../actions/ui_modal_action";

export const modalReducer = (prevState={}, action) => {
    switch(action.type){
        case RECEIVE_LOGIN:
            return {type: "login"};
        case RECEIVE_REGISTER:
            return {type: "register"};
        case REMOVE_MODAL:
            return {};
        default:
            return prevState
    }
}


export const modalErrorReducer = (prevState=[], action) => {
    switch(action.type){
        case RECEIVE_LOGIN:
        case RECEIVE_REGISTER:
        case REMOVE_MODAL:
            return [];
        case RECEIVE_MODAL_ERROR:
            return action.errors
        default:
            return prevState
    }
}