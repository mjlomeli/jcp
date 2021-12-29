import {debug} from "./tools";

export const fetchImages = () => {
    return $.ajax({
        url: '/api/images',
        method: 'GET'
    });
};

export const fetchImage = (imageId) => {
    if (!imageId) {
        debug.error(`An image id must be provided for fetchImage.`)
    }

    return $.ajax({
        url: `/api/images/${imageId}`,
        method: 'GET'
    });
};

export const createImage = (image) => {
    if (!image) {
        debug.error(`An image object must be provided for createImage.`)
    }

    return $.ajax({
        url: '/api/images',
        method: 'POST',
        data: {image: image}
    });
};

export const updateImage = (image) => {
    if (!image) {
        debug.error(`An image object be provided for updateImage.`)
    }

    return $.ajax({
        url: `/api/images/${image.id}`,
        method: 'PATCH',
        data: {image: image}
    });
};

export const deleteImage = (imageId) => {
    if (!imageId) {
        debug.error(`An image id must be provided for deleteImage.`)
    }

    return $.ajax({
        url: `/api/images/${imageId}`,
        method: 'DELETE'
    });
};

window.ImageUtil = {
    fetchImages,
    fetchImage,
    createImage,
    updateImage,
    deleteImage
}
