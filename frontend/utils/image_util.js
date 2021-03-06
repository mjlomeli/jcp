import {debug} from "./tools";

export const fetchImages = (query) => {
    if (query === null || typeof query !== 'object')
        return debug.errorPromise("ImageUtil.fetchImages must be passed an object");

    if ('ids' in query) query.ids = JSON.stringify(query.ids);
    if ('image_ids' in query) query.image_ids = JSON.stringify(query.image_ids)
    if ('product_ids' in query) query.product_ids = JSON.stringify(query.product_ids)
    if ('shop_ids' in query) query.shop_ids = JSON.stringify(query.shop_ids)
    if ('group_ids' in query) query.group_ids = JSON.stringify(query.group_ids)

    return $.ajax({
        url: '/api/images/query',
        method: 'GET',
        data: query
    });
};

export const fetchImage = (imageId) => {
    if (!imageId)
        return debug.errorPromise(`An image id must be provided for ImageUtil.fetchImage.`)

    return $.ajax({
        url: `/api/image/${imageId}`,
        method: 'GET'
    });
};

export const createImage = (image) => {
    if (!image)
        return debug.errorPromise(`An image object must be provided for ImageUtil.createImage.`)

    return $.ajax({
        url: '/api/image',
        method: 'POST',
        data: {image: image}
    });
};

export const updateImage = (image) => {
    if (!image)
        return debug.errorPromise(`An image object be provided for ImageUtil.updateImage.`)

    return $.ajax({
        url: `/api/image/${image.id}`,
        method: 'PATCH',
        data: {image: image}
    });
};

export const deleteImage = (imageId) => {
    if (!imageId)
        return debug.errorPromise(`An image id must be provided for ImageUtil.deleteImage.`)

    return $.ajax({
        url: `/api/image/${imageId}`,
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
