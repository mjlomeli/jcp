import * as ProductAction from "../actions/product_action";
import {Store} from "./store";
import {debug} from "../utils/tools";
import {errorProducts} from "../reducers/errors/product_error_reducer";

// let results = null;
// try {results = await ProductAction.fetchProducts({id: -1})(store.dispatch)} catch (e) { results = e}
// returns => {type: "RECEIVE ERROR", errors: [...] }


export class Product {
    static productError(productId) {
        let state = Store.store.getState();
        if (state && state.errors && state.errors.product)
            return state.errors.product[productId];
        debug.error("state.errors.product does not exist");
    }

    static productsError() {
        let state = Store.store.getState();
        if (state && state.errors && state.errors.products)
            return state.errors.products;
        debug.error("state.errors.products does not exist");
    }

    static hasProductError(productId) {
        return !!Product.productError(productId)
    }

    static hasProductsError() {
        return Product.productsError().length !== 0;
    }

    static all() {
        let state = Store.store.getState();
        if (state && state.entities && state.entities.products)
            return state.entities.products;
        debug.error("state.entities.products does not exist")
        return {};
    }

    static findById(id) {
        if (!Product.exists(id))
            return null;
        return new Product(Product.all()[id]);
    }


    static exists(id) {
        if (!id)
            return false;
        let products = Product.all();
        return !!products[id];
    }


    constructor(props) {
        if (!props)
            throw new Error("Product constructor can't be empty");
        this.id = props.id;
        this.title = props.title;
        this.price = props.price;
        this.quantity = props.quantity;
        this.description = props.description;
        this.user_id = props.user_id;
        this.shop_id = props.shop_id;
        this.image_ids = props.image_ids;
        this.icon_ids = props.icon_ids;
        this.category_id = props.category_id;
        this.creation_tsz = props.creation_tsz;
        this.ending_tsz = props.ending_tsz;
        this.original_creation_tsz = props.original_creation_tsz;
        this.last_modified_tsz = props.last_modified_tsz;
        this.state_tsz = props.state_tsz;
        this.state = props.state;
        this.categories = props.categories;
        this.currency_code = props.currency_code;
        this.sku = props.sku;
        this.tags = props.tags;
        this.materials = props.materials;
        this.shop_section_id = props.shop_section_id;
        this.featured_rank = props.featured_rank;
        this.url = props.url;
        this.views = props.views;
        this.num_favorers = props.num_favorers;
        this.shipping_template_id = props.shipping_template_id;
        this.processing_min = props.processing_min;
        this.processing_max = props.processing_max;
        this.who_made = props.who_made;
        this.is_supply = props.is_supply;
        this.when_made = props.when_made;
        this.item_weight = props.item_weight;
        this.item_weight_unit = props.item_weight_unit;
        this.item_length = props.item_length;
        this.item_width = props.item_width;
        this.item_height = props.item_height;
        this.item_dimensions_unit = props.item_dimensions_unit;
        this.is_private = props.is_private;
        this.style = props.style;
        this.non_taxable = props.non_taxable;
        this.is_customizable = props.is_customizable;
        this.is_digital = props.is_digital;
        this.file_data = props.file_data;
        this.should_auto_renew = props.should_auto_renew;
        this.language = props.language;
        this.has_variations = props.has_variations;
        this.taxonomy_id = props.taxonomy_id;
        this.taxonomy_path = props.taxonomy_path;
        this.used_manufacturer = props.used_manufacturer;
        this.is_vintage = props.is_vintage;
        this.results_per_page = props.results_per_page;
        this.page_number = props.page_number;
    }

    imagesSmall() {
        let images = [];
        this.image_ids.forEach(id => {
            Object.entries(Image.findByGroupId(parseInt(id))).forEach(pair => {
                let [id, image] = pair;
                if (image.dimension === "image_small")
                    images.push(new Image(image));
            })
        });
        return images;
    }

    imagesMedium(){
        let images = [];
        this.image_ids.forEach(id => {
            let groupId = parseInt(id);
            let groupImages = Image.findByGroupId(groupId);
            Object.entries(groupImages).forEach(pair => {
                let [id, image] = pair;
                if (image.dimension === "image_medium")
                    images.push(new Image(image));
            })
        });
        return images;
    }

    imagesLarge(){
        let images = [];
        this.image_ids.forEach(id => {
            Object.entries(Image.findByGroupId(parseInt(id))).forEach(pair => {
                let [id, image] = pair;
                if (image.dimension === "image_large")
                    images.push(new Image(image));
            })
        });
        return images;
    }

    imagesFull(){
        let images = [];
        this.image_ids.forEach(id => {
            Object.entries(Image.findByGroupId(parseInt(id))).forEach(pair => {
                let [id, image] = pair;
                if (image.dimension === "image_full")
                    images.push(new Image(image));
            })
        });
        return images;
    }

    toString(){
        return `<Product(title: ${this.title}, price: ${this.price}, image_ids: ${this.image_ids})>`
    }

}

window.Product = Product;