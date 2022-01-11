import {
    RECEIVE_IMAGES,
    REMOVE_IMAGES
} from "../../actions/image_action";
import {ENTITY} from "../constants";

const to_entity_icons = (entity={}, images={}) => {
    let entity_icons = {};
    Object.entries(entity).forEach(entity_pair=>{
        let [entity_id, entity] = entity_pair;
        let icon_ids = entity.icon_ids || [];
        if (icon_ids && icon_ids.length) {
            entity_icons[entity_id] = {};
            icon_ids.forEach(icon_id => {
                entity_icons[entity_id][icon_id] = images[icon_id];
            })
        }
    })
    return entity_icons;
}

const to_entity_images = (entity={}, images={}) => {
    let entity_images = {};
    Object.entries(entity).forEach(entity_pair=>{
        let [entity_id, entity] = entity_pair;
        let image_ids = entity.image_ids || [];
        if (image_ids && image_ids.length) {
            entity_images[entity_id] = {};
            image_ids.forEach(image_id => {
                entity_images[entity_id][image_id] = images[image_id];
            })
        }
    })
    return entity_images;
}


export function reducerImages(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch(action.type){
        case ENTITY:
        case RECEIVE_IMAGES:
            let images = {};
            if ('listings' in action && 'images' in action.listings){
                Object.entries(action.listings.images).forEach(gpair => {
                    let [group_id, dimensional_images] = gpair;
                    Object.entries(dimensional_images).forEach(dpair => {
                        let [dimension, image] = dpair;
                        images[image.id] = image;
                    })
                })}
            return {...newState, ...images}
        case REMOVE_IMAGES:
            action.imageIds.forEach(id => delete newState[parseInt(action.imageId)])
            return newState;
        default:
            return prevState
    }
}

export function reducerGroupImages(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch(action.type){
        case ENTITY:
        case RECEIVE_IMAGES:
            if ('listings' in action && 'images' in action.listings)
                return {...newState, ...action.listings.images}
            return newState;
        default:
            return prevState
    }
}

export function reducerProductImages(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case ENTITY:
            if ('listings' in action && 'products' in action.listings && 'images' in action.listings)
                return {...newState, ...to_entity_images(action.listings.products, action.listings.images)}
            return newState;
        default:
            return newState
    }
}

export function reducerUserImages(prevState={}, action) {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch (action.type) {
        case ENTITY:
            if ('listings' in action && 'users' in action.listings && 'images' in action.listings)
                return {...newState, ...to_entity_images(action.listings.users, action.listings.images)}
            return newState;
        default:
            return newState
    }
}

export function reducerShopImages(prevState={}, action) {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch (action.type) {
        case ENTITY:
            if ('listings' in action && 'shops' in action.listings && 'images' in action.listings)
                return {...newState, ...to_entity_icons(action.listings.shops, action.listings.images)}
            return newState;
        default:
            return newState
    }
}