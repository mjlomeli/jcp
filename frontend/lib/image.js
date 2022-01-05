import {Store} from "./store";
import {debug} from "../utils/tools";

export class Image {
    static imageError(imageId) {
        let state = Store.store.getState();
        if (state && state.errors && state.errors.image)
            return state.errors.image[imageId];
        debug.error("state.errors.image does not exist");
        return {};
    }

    static imagesError() {
        let state = Store.store.getState();
        if (state && state.errors && state.errors.images)
            return state.errors.images;
        debug.error("state.errors.images does not exist");
        return [];
    }

    static hasImageError(imageId) {
        return !!Image.imageError(imageId)
    }

    static hasImagesError() {
        return Image.imagesError().length !== 0;
    }

    static all() {
        let state = Store.store.getState();
        if (state && state.entities && state.entities.images)
            return state.entities.images;
        debug.error("state.entities.images does not exist")
        return {};
    }

    static allProducts() {
        let state = Store.store.getState();
        if (state && state.entities && state.entities.productImages)
            return state.entities.productImages;
        debug.error("state.entities.productImages does not exist")
        return {};
    }

    static allShops() {
        let state = Store.store.getState();
        if (state && state.entities && state.entities.shopImages)
            return state.entities.shopImages;
        debug.error("state.entities.shopImages does not exist")
        return {};
    }

    static allUsers() {
        let state = Store.store.getState();
        if (state && state.entities && state.entities.userImages)
            return state.entities.userImages;
        debug.error("state.entities.userImages does not exist")
        return {};
    }

    static allGroups(){
        let state = Store.store.getState();
        if (state && state.entities && state.entities.groupImages)
            return state.entities.groupImages;
        debug.error("state.entities.groupImages does not exist")
        return {};
    }

    static findById(id) {
        if (Image.exists(id))
            return new Image(Image.all()[id]);
        return null;
    }

    static findByProductId(id) {
        return Image.allProducts()[id] || {};
    }

    static findByShopId(id){
        return Image.allShops()[id] || {};
    }

    static findShopImage(shopId){
        let all = Image.findByShopId(shopId);
        let image = null;
        Object.entries(all.shop || {}).forEach(pair =>{
            let [id, oneImage] = pair;
            return image = oneImage;
        });

        return image;
    }

    static findProductImagesByShop(shopId){
        let images = Image.findByShopId(shopId) || {};
        return images.products;
    }

    static findByUserId(id){
        let image = null;
        let all = Image.allUsers()[id] || {};
        Object.entries(all).forEach(pair =>{
            let [id, oneImage] = pair;
            return image = oneImage;
        });
        return image;
    }

    static findByGroupId(id) {
        return Image.allGroups()[id] || {};
    }

    static exists(id) {
        let images = Image.all();
        return !!images[id];
    }




    constructor(props={}) {
        this.id = props.id;
        this.data = props.data;
        this.mimetype = props.mimetype;
        this.size = props.size;
        this.url = props.url;
        this.encoding = props.encoding;
        this.name = props.name;
        this.group_name = props.group_name;
        this.group_id = props.group_id;
        this.dimension = props.dimension;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
    }

    source(){
        if (this.url)
            return this.url;
        return `data:${this.mimetype};${this.encoding},${this.data}`;
    }

    toString(){
        return `<Image(group_id: ${this.group_id}, dimension: ${this.dimension}, source: ${this.source()})>`
    }
}

window.Image = Image;