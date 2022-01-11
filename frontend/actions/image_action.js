import * as ImageUtil from '../utils/image_util'
import * as AlertAction from './alert_action'
import {parse_int_listings} from "../utils/tools";

export const RECEIVE_IMAGES = "RECEIVE_IMAGES";

export const REMOVE_IMAGES = "REMOVE_IMAGES";

export const RECEIVE_IMAGES_ERRORS = "RECEIVE_IMAGES_ERRORS";
export const RECEIVE_IMAGES_GENERAL_ERRORS = "RECEIVE_IMAGES_GENERAL_ERRORS";

export const RESET_IMAGES_ERRORS = "RESET_IMAGES_ERRORS";
export const RESET_ALL_IMAGES_ERRORS = "RESET_ALL_IMAGES_ERRORS";


const receiveImages = listings => ({
    type: RECEIVE_IMAGES,
    listings: parse_int_listings(listings)
})

const removeImages = imageIds => ({
    type: REMOVE_IMAGES,
    imageIds: imageIds
})


const receiveImagesErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_IMAGES_ERRORS,
        errors: errors
    }
}

export const receiveImagesGeneralErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_IMAGES_GENERAL_ERRORS,
        errors: errors
    }
}


/*    Separation      */


export const fetchImages = (query) => dispatch => {
    return ImageUtil.fetchImages(query).then(
        images => dispatch(receiveImages(images)),
        err => {
            let keys = query && Object.keys(query) || [];
            let hasIds = id => ['id', 'ids', 'group_id', 'group_ids'].includes(id);
            if (keys.some(hasIds))
                return dispatch(receiveImagesErrors(dispatch, err.responseJSON))
            else
                return dispatch(receiveImagesGeneralErrors(dispatch, err.responseJSON))
        })
}

export const fetchImage = imageId => (dispatch) => {
    return ImageUtil.fetchImage(imageId).then(
        images => dispatch(receiveImages(images)),
        err => dispatch(receiveImagesErrors(dispatch, err.responseJSON)))
}

export const createImage = image => dispatch => (
    ImageUtil.createImage(image).then(
        image => {
            dispatch(AlertAction.success("Your image has been uploaded."));
            dispatch(receiveImages(image))
        },
        err => dispatch(receiveImagesErrors(dispatch, err.responseJSON)))
)


export const updateImage = image => dispatch => (
    ImageUtil.updateImage(image).then(
        image => {
            dispatch(AlertAction.success("Your image has been updated."));
            dispatch(receiveImages(image))
        },
        err => dispatch(receiveImagesErrors(dispatch, err.responseJSON)))
)

export const deleteImages = imageId => dispatch => (
    ImageUtil.deleteImage(imageId).then(
        image => {
            dispatch(AlertAction.notification("Your image has been deleted."));
            dispatch(removeImages(image.id))
        },
        err => dispatch(receiveImagesErrors(dispatch, err.responseJSON)))
)


export const resetImageError = imageId => dispatch => (
    dispatch({type: RESET_IMAGES_ERRORS, imageId: imageId})
)

export const resetImagesErrors = () => dispatch => (
    dispatch({type: RESET_ALL_IMAGES_ERRORS})
)

window.ImageAction = {
    fetchImage,
    fetchImages,
    resetImageError,
    resetImagesErrors,
    createImage,
    updateImage,
    deleteImages
}

window.ImageDispatchers = {
    receiveImages,
    removeImages,
    receiveImagesErrors,
    receiveImagesGeneralErrors
}