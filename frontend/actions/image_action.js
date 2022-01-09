import * as ImageUtil from '../utils/image_util'
import * as AlertAction from './alert_action'
import {
    RECEIVE_PRODUCTS_GENERAL_ERRORS,
    receiveProducts,
    receiveProductsErrors,
    receiveProductsGeneralErrors, removeProducts
} from "./product_action";

export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_PRODUCT_IMAGES = "RECEIVE_PRODUCT_IMAGES";
export const RECEIVE_GROUP_IMAGES = "RECEIVE_GROUP_IMAGES";
export const RECEIVE_SHOP_IMAGES = "RECEIVE_SHOP_IMAGES";
export const RECEIVE_USER_IMAGES = "RECEIVE_USER_IMAGES";

export const REMOVE_IMAGES = "REMOVE_IMAGES";

export const RECEIVE_IMAGES_ERRORS = "RECEIVE_IMAGES_ERRORS";
export const RECEIVE_PRODUCT_IMAGES_ERRORS = "RECEIVE_PRODUCT_IMAGES_ERRORS";
export const RECEIVE_GROUP_IMAGES_ERRORS = "RECEIVE_GROUP_IMAGES_ERRORS";
export const RECEIVE_SHOP_IMAGES_ERRORS = "RECEIVE_SHOP_IMAGES_ERRORS";
export const RECEIVE_USER_IMAGES_ERRORS = "RECEIVE_USER_IMAGES_ERRORS";
export const RECEIVE_IMAGES_GENERAL_ERRORS = "RECEIVE_IMAGES_GENERAL_ERRORS";

export const RESET_IMAGES_ERRORS = "RESET_IMAGES_ERRORS";
export const RESET_ALL_IMAGES_ERRORS = "RESET_ALL_IMAGES_ERRORS";


const receiveImages = images => ({
    type: RECEIVE_IMAGES,
    images: images
})

const receiveProductImages = (productId, images) => ({
    type: RECEIVE_PRODUCT_IMAGES,
    images: images,
    productId: parseInt(productId)
})
const receiveShopImages = (shopId, images) => ({
    type: RECEIVE_SHOP_IMAGES,
    images: images,
    shopId: parseInt(shopId)
})
const receiveUserImages = (userId, images) => ({
    type: RECEIVE_USER_IMAGES,
    images: images,
    userId: parseInt(userId)
})
const receiveGroupImages = (groupId, images) => ({
    type: RECEIVE_GROUP_IMAGES,
    images: images,
    groupId: parseInt(groupId)
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

const receiveProductImagesErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_PRODUCT_IMAGES_ERRORS,
        errors: errors
    }
}

const receiveShopImagesErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_SHOP_IMAGES_ERRORS,
        errors: errors
    }
}

const receiveUserImagesErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_USER_IMAGES_ERRORS,
        errors: errors
    }
}
const receiveGroupImagesErrors = (dispatch, errors) => {
    dispatch(AlertAction.systemError(errors));
    return {
        type: RECEIVE_GROUP_IMAGES_ERRORS,
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
        err => dispatch(receiveImagesErrors(err.responseJSON)))
}

export const fetchImageByProductId = productId => (dispatch) => {
    return ImageUtil.fetchImageByProductId(productId).then(
        images => dispatch(receiveProductImages(productId, images)),
        err => dispatch(receiveProductImagesErrors(err.responseJSON)))
}

export const fetchImageByUserId = userId => (dispatch) => {
    return ImageUtil.fetchImageByUserId(userId).then(
        images => dispatch(receiveUserImages(userId, images)),
        err => dispatch(receiveUserImagesErrors(err.responseJSON)))
}

export const fetchImageByShopId = shopId => (dispatch) => {
    return ImageUtil.fetchImageByShopId(shopId).then(
        images => dispatch(receiveShopImages(shopId, images)),
        err => dispatch(receiveShopImagesErrors(err.responseJSON)))
}

export const fetchImageByGroupId = groupId => (dispatch) => {
    return ImageUtil.fetchImageByGroupId(groupId).then(
        images => dispatch(receiveGroupImages(groupId, images)),
        err => dispatch(receiveGroupImagesErrors(err.responseJSON)))
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
    fetchImageByShopId,
    fetchImageByUserId,
    fetchImageByProductId,
    fetchImageByGroupId,
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