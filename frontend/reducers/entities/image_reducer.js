import {
    RECEIVE_IMAGES,
    RECEIVE_PRODUCT_IMAGES,
    RECEIVE_GROUP_IMAGES,
    RECEIVE_USER_IMAGES,
    RECEIVE_SHOP_IMAGES,
    REMOVE_IMAGES
} from "../../actions/image_action";

export function reducerImages(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy

    switch(action.type){
        case RECEIVE_GROUP_IMAGES:
            action.images.forEach(image =>{
                image.id = parseInt(image.id);
                newState[image.id] = image;
            })
            break;
        case RECEIVE_USER_IMAGES:
            let images = action.images && action.images["images"] || []
            images.forEach(image =>{
                image.id = parseInt(image.id);
                newState[image.id] = image;
            })
            break;
        case RECEIVE_SHOP_IMAGES:
            let shopImages = action.images && action.images["shop_icons"] || []
            shopImages.forEach(image =>{
                image.id = parseInt(image.id);
                newState[image.id] = image;
            })
            let productImages = action.images && action.images["product_images"] || []
            productImages.forEach(image =>{
                image.id = parseInt(image.id);
                newState[image.id] = image;
            })
            break;
        case RECEIVE_PRODUCT_IMAGES:
            action.images.forEach(image =>{
                image.id = parseInt(image.id);
                newState[image.id] = image;
            })
            break;
        default:
            break;
    }

    switch(action.type){
        case RECEIVE_IMAGES:
            action.image.id = parseInt(action.image.id);
            newState[action.image.id] = action.image;
            return newState;
        case RECEIVE_IMAGES:
            action.images.forEach(image =>{
                image.id = parseInt(image.id);
                newState[image.id] = image;
            })
            return newState;
        case REMOVE_IMAGES:
            delete newState[parseInt(action.imageId)]
            return newState;
        default:
            return prevState
    }
}

export function reducerGroupImages(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    let groupId = null;
    let groupImages = null;
    switch(action.type){
        case RECEIVE_IMAGES:
            groupId = parseInt(action.image.group_id);
            action.image.id = parseInt(action.image.id);

            groupImages = newState[groupId] || {};
            groupImages[action.image.dimension] = action.image;
            newState[groupId] = groupImages;
            return newState;
        case RECEIVE_GROUP_IMAGES:
            groupId = parseInt(action.groupId);
            groupImages = newState[groupId] || {};
            action.images.forEach(image =>{
                image.id = parseInt(image.id);
                groupImages[image.dimension] = image;
            })
            newState[groupId] = groupImages;
            return newState;
        case RECEIVE_PRODUCT_IMAGES:
            action.images.forEach(image =>{
                groupId = parseInt(image.group_id);
                image.id = parseInt(image.id);
                groupImages = newState[groupId] || {};
                groupImages[image.dimension] = image;
                newState[groupId] = groupImages;
            })
            return newState;
        case RECEIVE_SHOP_IMAGES:
            let productImages = action.images && action.images["product_images"] || []
            productImages.forEach(image =>{
                groupId = parseInt(image.group_id);
                image.id = parseInt(image.id);
                groupImages = newState[groupId] || {};
                groupImages[image.dimension] = image;
                newState[groupId] = groupImages;
            })
            return newState;
        case REMOVE_IMAGES:
            Object.entries(prevState).forEach(groupPair =>{
                let [groupId, groupImages] = groupPair;
                Object.entries(groupImages || {}).forEach(imagePair => {
                    let [dimension, image] = imagePair;
                    if (parseInt(image.id) === parseInt(action.imageId))
                        delete newState[groupId][dimension]
                })
            })
            return newState;
        default:
            return prevState
    }
}

export function reducerProductImages(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    let productImages = {};
    switch(action.type){
        case RECEIVE_PRODUCT_IMAGES:
            let productId = parseInt(action.productId);
            productImages = {}
            action.images.forEach(image =>{
                image.id = parseInt(image.id);
                productImages[image.id] = image;
            })
            newState[productId] = {...newState[productId], ...productImages};
            return newState;
        case REMOVE_IMAGES:
            Object.entries(prevState).forEach(productPair =>{
                let [productId, productImages] = productPair;
                Object.entries(productImages || {}).forEach(imagePair => {
                    let [imageId, image] = pair;
                    if (imageId === parseInt(action.imageId))
                        delete newState[productId][imageId]
                })
            })
            return newState;
        default:
            return newState
    }
}

export function reducerUserImages(prevState={}, action) {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    let userImages = {};
    switch (action.type) {
        case RECEIVE_USER_IMAGES:
            let userId = parseInt(action.userId);
            let images = action.images && action.images["images"] || []
            images.forEach(image => {
                image.id = parseInt(image.id);
                userImages[image.id] = image;
            })
            newState[userId] = {...newState[userId], ...userImages};
            return newState;
        case REMOVE_IMAGES:
            Object.entries(prevState).forEach(userPair => {
                let [userId, userImages] = userPair;
                Object.entries(userImages || {}).forEach(imagePair => {
                    let [imageId, image] = imagePair;
                    if (parseInt(imageId) === parseInt(action.imageId))
                        delete newState[userId][imageId]
                })
            })
            return newState;
        default:
            return newState
    }
}

export function reducerShopImages(prevState={}, action) {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch (action.type) {
        case RECEIVE_SHOP_IMAGES:
            let shop = {};
            let shopImages = action.images && action.images["shop_icons"] || []
            shopImages.forEach(image =>{
                image.id = parseInt(image.id);
                shop[image.id] = image;
            })

            let products = {};
            let productImages = action.images && action.images["product_images"] || []
            productImages.forEach(image =>{
                image.id = parseInt(image.id);
                products[image.id] = image;
            })

            let shopId = parseInt(action.shopId);
            newState[action.shopId] = {...newState[shopId], ...{shop, products}};
            return newState;
        case REMOVE_IMAGES:
            Object.entries(prevState).forEach(shopData => {
                let [shopId, group] = shopData;
                Object.entries(group || {}).forEach(groupPair => {
                    let [type, images] = groupPair;
                    Object.entries(images || {}).forEach(imagesPair => {
                        let [imageId, image] = imagesPair;
                        if (parseInt(imageId) === parseInt(action.imageId))
                            delete newState[shopId][type][imageId]
                    })
                })
            })
            return newState;
        default:
            return newState
    }
}