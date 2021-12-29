import {
    RECEIVE_REVIEW,
    RECEIVE_REVIEW_ERROR
} from "../../actions/review_action";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_REVIEW_ERROR:
            return action.errors;
        case RECEIVE_REVIEW:
            return [];
        default:
            return prevState;
    }
};
