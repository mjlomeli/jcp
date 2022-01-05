import {debug} from "./tools";

export const fetchImages = ({id, ids, image_id, image_ids, product_id,
    product_ids, shop_id, shop_ids, user_id, dimension, group_name,
    group_id, group_ids}) => {

    if (ids) ids = JSON.stringify(ids);
    if (image_ids) image_ids = JSON.stringify(image_ids)
    if (product_ids) product_ids = JSON.stringify(product_ids)
    if (shop_ids) shop_ids = JSON.stringify(shop_ids)
    if (group_ids) group_ids = JSON.stringify(group_ids)

    return $.ajax({
        url: '/api/images',
        method: 'GET',
        data: {id, ids, image_id, image_ids, product_id,
            product_ids, shop_id, shop_ids, user_id, dimension, group_name,
            group_id, group_ids}
    });
};

export const fetchImageByProductId = (productId) => {
    return fetchImages({product_id: productId});
}

export const fetchImageByShopId = (shopId) => {
    return fetchImages({shop_id: shopId});
}

export const fetchImageByUserId = (userId) => {
    return fetchImages({user_id: userId});
}

export const fetchImageByGroupId = (groupId) => {
    return fetchImages({group_id: groupId});
}

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
    fetchImageByUserId,
    fetchImageByShopId,
    fetchImageByProductId,
    fetchImageByGroupId,
    createImage,
    updateImage,
    deleteImage
}
