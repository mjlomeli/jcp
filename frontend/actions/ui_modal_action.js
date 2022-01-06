import * as ModalUtil from "../utils/ui_modal_util";
import {receiveErrors} from "./session_action";

export const RECEIVE_LOGIN = "RECEIVE_LOGIN";
export const RECEIVE_REGISTER = "RECEIVE_REGISTER";
export const REMOVE_MODAL = "REMOVE_MODAL";
export const RECEIVE_MODAL_ERROR = "MODAL_ERROR";


const receiveLogin = () => ({
    type: RECEIVE_LOGIN
})

const receiveRegister = () => ({
    type: RECEIVE_REGISTER
})

const removeModal = () => ({
    type: REMOVE_MODAL
})


const receiveModalError = () => ({
    type: RECEIVE_MODAL_ERROR,
    errors: ["Need to be logged out to open modal."]
})


export const createLogin = () => (dispatch, getState) => {
    return ModalUtil.createLogin(getState()).then(
        login => dispatch(receiveLogin()),
        error => dispatch(receiveModalError())
    )};

export const createRegister = () => (dispatch, getState) => {
    return ModalUtil.createRegister(getState()).then(
        register => dispatch(receiveRegister()),
        error => dispatch(receiveModalError())
    )};


export const deleteModal = () => (dispatch) => {
    return dispatch(removeModal())
};


window.ModalAction = {
    createRegister,
    createLogin,
    deleteModal
}