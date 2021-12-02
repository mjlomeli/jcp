import * as UIUtil from "../utils/ui_utils";

export const RECEIVE_UI = "RECEIVE_UI";
export const RECEIVE_UI_ERROR = "RECEIVE_UI_ERROR";

const receiveUI = ({uiid, ui}) =>({
    type: RECEIVE_UI,
    uiid: uiid,
    ui: ui
})

const receiveUIError = uiError =>({
    type: RECEIVE_UI_ERROR,
    errors: uiError
})


/*    Separation      */

export const fetchUI = uiid => (dispatch, getState) => {
    return getState().ui.product.ui[uiid.reducer][uiid.id];
};

export const updateUI = (uiid, ui) => dispatch => {
    return UIUtil.updateUI(uiid, ui).then(
        both => dispatch(receiveUI(both))).catch(
        err => {
            dispatch(receiveUIError(err.responseJSON))
            throw new Error(err.responseJSON)
        }
    )
};


window.updateUI = updateUI;
window.receiveUI = receiveUI;
window.fetchUI = fetchUI;
