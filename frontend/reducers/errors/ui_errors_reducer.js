import {
    RECEIVE_USER_CONTROL_ERROR,
    RECEIVE_USER_CONTROL
} from "../../actions/ui_user_control_actions";


export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_USER_CONTROL_ERROR:
            return action.errors;
        case RECEIVE_USER_CONTROL:
            return []; // If the user control is valid, return empty errors
        default:
            return prevState;
    }
};
