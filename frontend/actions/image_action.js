import * as ImageUtil from '../utils/image_util'

export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const RECEIVE_PRODUCT_IMAGES = "RECEIVE_PRODUCT_IMAGES";
export const RECEIVE_GROUP_IMAGES = "RECEIVE_GROUP_IMAGES";
export const RECEIVE_SHOP_IMAGES = "RECEIVE_SHOP_IMAGES";
export const RECEIVE_USER_IMAGES = "RECEIVE_USER_IMAGES";

export const RECEIVE_IMAGE_ERROR = "RECEIVE_IMAGE_ERROR";
export const RECEIVE_IMAGES_ERROR = "RECEIVE_IMAGES_ERROR";
export const RECEIVE_PRODUCT_IMAGES_ERROR = "RECEIVE_PRODUCT_IMAGES_ERROR";
export const RECEIVE_GROUP_IMAGES_ERROR = "RECEIVE_GROUP_IMAGES_ERROR";
export const RECEIVE_SHOP_IMAGES_ERROR = "RECEIVE_SHOP_IMAGE_ERROR";
export const RECEIVE_USER_IMAGES_ERROR = "RECEIVE_USER_IMAGE_ERROR";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

const receiveImages = images => ({
    type: RECEIVE_IMAGES,
    images: images
})

const receiveImage = image => ({
    type: RECEIVE_IMAGE,
    image: image
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

const receiveImageError = (imageId, errors) => ({
    type: RECEIVE_IMAGE_ERROR,
    imageId: parseInt(imageId),
    errors: errors
})
const receiveImagesError = errors => ({
    type: RECEIVE_IMAGES_ERROR,
    errors: errors
})
const receiveProductImagesError = (productId, error) => ({
    type: RECEIVE_PRODUCT_IMAGES_ERROR,
    error: error,
    productId: parseInt(productId)
})
const receiveShopImagesError = (shopId, error) => ({
    type: RECEIVE_SHOP_IMAGES_ERROR,
    error: error,
    shopId: parseInt(shopId)
})
const receiveUserImagesError = (userId, error) => ({
    type: RECEIVE_USER_IMAGES_ERROR,
    error: error,
    userId: parseInt(userId)
})
const receiveGroupImagesError = (groupId, error) => ({
    type: RECEIVE_GROUP_IMAGES_ERROR,
    error: error,
    groupId: groupId
})

const removeImage = imageId => ({
    type: REMOVE_IMAGE,
    imageId: imageId
})


/*    Separation      */


export const fetchImages = () => dispatch => (
    ImageUtil.fetchImages().then(
        images => dispatch(receiveImages(images)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

export const fetchImage = imageId => (dispatch) => {
    return ImageUtil.fetchImage(imageId).then(
        image => dispatch(receiveImage(image)),
        err => dispatch(receiveImageError(imageId, err.responseJSON))
    )
}

export const fetchImageByProductId = productId => (dispatch) => {
    return ImageUtil.fetchImageByProductId(productId).then(
        images => dispatch(receiveProductImages(productId, images)),
        err => dispatch(receiveProductImagesError(productId, err.responseJSON))
    )
}

export const fetchImageByUserId = userId => (dispatch) => {
    return ImageUtil.fetchImageByUserId(userId).then(
        images => dispatch(receiveUserImages(userId, images)),
        err => dispatch(receiveUserImagesError(userId, err.responseJSON))
    )
}

export const fetchImageByShopId = shopId => (dispatch) => {
    return ImageUtil.fetchImageByShopId(shopId).then(
        images => dispatch(receiveShopImages(shopId, images)),
        err => dispatch(receiveShopImagesError(shopId, err.responseJSON))
    )
}

export const fetchImageByGroupId = groupId => (dispatch) => {
    return ImageUtil.fetchImageByGroupId(groupId).then(
        images => dispatch(receiveGroupImages(groupId, images)),
        err => dispatch(receiveGroupImagesError(groupId, err.responseJSON))
    )
}

export const createImage = image => dispatch => (
    ImageUtil.createImage(image).then(
        image => dispatch(receiveImage(image)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)


export const updateImage = image => dispatch => (
    ImageUtil.updateImage(image).then(
        image => dispatch(receiveImage(image)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

export const deleteImage = imageId => dispatch => (
    ImageUtil.deleteImage(imageId).then(
        image => dispatch(removeImage(image.id)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

window.ImageAction = {
    fetchImage,
    fetchImages,
    fetchImageByShopId,
    fetchImageByUserId,
    fetchImageByProductId,
    fetchImageByGroupId,
    createImage,
    updateImage,
    deleteImage
}