import {
    RECEIVE_IMAGE,
    RECEIVE_IMAGE_ERROR,
    RESET_IMAGES_ERROR,
    RESET_IMAGE_ERROR
} from "../../actions/image_action";

export const errorImage = (prevState = [], action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_IMAGE_ERROR:
            newState[action.imageId] = action.errors;
            return newState;
        case RECEIVE_IMAGE:
            delete newState[action.image.id];
            return newState;
        case RESET_IMAGE_ERROR:
            delete newState[action.imageId];
            return newState;
        default:
            return prevState;
    }
};


export const errorImages = (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_IMAGE_ERROR:
            return action.errors;
        case RECEIVE_IMAGE:
        case RESET_IMAGES_ERROR:
            return [];
        default:
            return prevState;
    }
};