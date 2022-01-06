import * as UserControlsUtil from "../utils/ui_user_controls_util";

export const RECEIVE_USER_CONTROL = "RECEIVE_USER_CONTROL";
export const RECEIVE_USER_CONTROL_ERROR = "RECEIVE_USER_CONTROL_ERROR";

const receiveUserControl = (reducer, id, ui) =>({
    type: RECEIVE_USER_CONTROL,
    reducer: reducer,
    id: id,
    ui: ui
})

const receiveUserControlError = errors =>({
    type: RECEIVE_USER_CONTROL_ERROR,
    errors: errors
})


/*    Separation      */

export const fetchUserControl = (reducer, id) => (dispatch, getState) => {
    return getState().ui.userControl[reducer][id];
};


export const updateUserControl = (reducer, id, ui) => dispatch => {
    return UserControlsUtil.updateUserControl(reducer, id, ui).then(
        control => dispatch(receiveUserControl(control.reducer, control.id, control.ui))).catch(
        err => {
            dispatch(receiveUserControlError(err.responseJSON))
            throw new Error(err.responseJSON)
        }
    )
};


window.updateUserControl = updateUserControl;
window.receiveUserControl = receiveUserControl;
window.fetchUserControl = fetchUserControl;
