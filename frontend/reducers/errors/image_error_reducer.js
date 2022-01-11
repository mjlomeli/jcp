import {
    RECEIVE_IMAGES,
    RECEIVE_IMAGES_ERRORS,
    RESET_ALL_IMAGES_ERRORS,
    RESET_IMAGES_ERRORS
} from "../../actions/image_action";

export const errorImage = (prevState = {}, action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_IMAGES_ERRORS:
            newState[action.imageId] = action.errors;
            return newState;
        case RECEIVE_IMAGES:
            let images = Object.values(action.listings.images)
            images.forEach(image => delete newState[image.id])
            return newState;
        case RESET_IMAGES_ERRORS:
            return newState;
        default:
            return prevState;
    }
};


export const errorImages = (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_IMAGES_ERRORS:
            return action.errors;
        case RECEIVE_IMAGES:
        case RESET_ALL_IMAGES_ERRORS:
            return [];
        default:
            return prevState;
    }
};