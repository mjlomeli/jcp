import {RECEIVE_USER_CONTROL_ERROR, RECEIVE_USER_CONTROL} from "../../actions/ui_user_control_actions";
import {RECEIVE_PAGE, RECEIVE_PAGE_ERROR} from "../../actions/ui_page_actions";
import {RECEIVE_THEME, RECEIVE_THEME_ERROR} from "../../actions/ui_theme_actions";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_USER_CONTROL_ERROR:
            return action.errors;
        case RECEIVE_USER_CONTROL:
            return []; // If the user control is valid, return empty errors
        case RECEIVE_THEME_ERROR:
            return action.errors;
        case RECEIVE_THEME:
            return []; // If the theme is valid, return empty errors
        case RECEIVE_PAGE_ERROR:
            return action.errors;
        case RECEIVE_PAGE:
            return []; // If the page is valid, return empty errors
        default:
            return prevState;
    }
};
