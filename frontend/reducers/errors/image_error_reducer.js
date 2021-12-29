import {
    RECEIVE_IMAGE,
    RECEIVE_IMAGE_ERROR
} from "../../actions/image_action";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_IMAGE_ERROR:
            return action.errors;
        case RECEIVE_IMAGE:
            return [];
        default:
            return prevState;
    }
};
