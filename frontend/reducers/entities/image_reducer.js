import {
    RECEIVE_IMAGE,
    REMOVE_IMAGE,
    RECEIVE_IMAGES
} from "../../actions/image_action";

export default function ImageReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_IMAGES:
            action.images.forEach(image =>{
                newState[image.id] = image;
            })
            return newState;
        case RECEIVE_IMAGE:
            newState[action.image.id] = action.image;
            return newState;
        case REMOVE_IMAGE:
            delete newState[action.imageId]
            return newState;
        default:
            return newState
    }
}