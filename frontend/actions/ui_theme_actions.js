import * as ThemeUtil from "../utils/ui_theme_util"

export const RECEIVE_THEME = "RECEIVE_THEME";
export const RECEIVE_THEME_ERROR = "RECEIVE_THEME_ERROR";

const receiveTheme = (reducer, id, ui) =>({
    type: RECEIVE_THEME,
    reducer: reducer,
    id: id,
    ui: ui
})

const receiveThemeError = errors =>({
    type: RECEIVE_THEME_ERROR,
    errors: errors
})


/*    Separation      */

export const fetchTheme = (reducer, id) => (dispatch, getState) => {
    return getState().ui.theme[reducer][id];
};


export const updateTheme = (reducer, id, ui) => dispatch => {
    return ThemeUtil.updateTheme(reducer, id, ui).then(
        control => dispatch(receiveTheme(control.reducer, control.id, control.ui))).catch(
        err => {
            dispatch(receiveThemeError(err.responseJSON))
            throw new Error(err.responseJSON)
        }
    )
};


window.updateTheme = updateTheme;
window.receiveTheme = receiveTheme;
window.fetchTheme = fetchTheme;
