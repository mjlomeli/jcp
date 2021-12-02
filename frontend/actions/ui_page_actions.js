import * as PagesUtil from "../utils/ui_page_utils";

export const RECEIVE_PAGE = "RECEIVE_PAGE";
export const RECEIVE_PAGE_ERROR = "RECEIVE_PAGE_ERROR";

const receivePage = (reducer, id, ui) =>({
    type: RECEIVE_PAGE,
    reducer: reducer,
    id: id,
    ui: ui
})

const receivePageError = error =>({
    type: RECEIVE_PAGE_ERROR,
    errors: error
})


/*    Separation      */

export const fetchPage = (reducer, id) => (dispatch, getState) => {
    return getState().ui.page[reducer][id];
};


export const updatePage = (reducer, id, ui) => dispatch => {
    return PagesUtil.updatePage(reducer, id, ui).then(
        control => dispatch(receivePage(control.reducer, control.id, control.ui))).catch(
        err => {
            dispatch(receivePageError(err.responseJSON))
            throw new Error(err.responseJSON)
        }
    )
};


window.updatePage = updatePage;
window.receivePage = receivePage;
window.fetchPage = fetchPage;
