import * as ImageUtil from '../utils/image_util'

export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const RECEIVE_IMAGE_ERROR = "RECEIVE_IMAGE_ERROR";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

const receiveImages = images =>({
    type: RECEIVE_IMAGES,
    images: images
})

const receiveImage = image =>({
    type: RECEIVE_IMAGE,
    image: image
})

const receiveImageError = imageError =>({
    type: RECEIVE_IMAGE_ERROR,
    imageError: imageError
})

const removeImage = imageId =>({
    type: REMOVE_IMAGE,
    imageId: imageId
})



/*    Separation      */


export const fetchImages = () => dispatch =>(
    ImageUtil.fetchImages().then(
        images => {
            return dispatch(receiveImages(images))
        },
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

export const fetchImage = imageId => (dispatch) => {
    return ImageUtil.fetchImage(imageId).then(
        image => dispatch(receiveImage(image)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
}

export const createImage = image => dispatch =>(
    ImageUtil.createImage(image).then(
        image => dispatch(receiveImage(image)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

export const updateImage = image => dispatch =>(
    ImageUtil.updateImage(image).then(
        image => dispatch(receiveImage(image)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

export const deleteImage = imageId => dispatch =>(
    ImageUtil.deleteImage(imageId).then(
        image => dispatch(removeImage(image.id)),
        err => dispatch(receiveImageError(err.responseJSON))
    )
)

window.ImageAction = {
    fetchImage,
    fetchImages,
    createImage,
    updateImage,
    deleteImage
}