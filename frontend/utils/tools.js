export const parse_int_image_ids = (image_listings = {}) => {
    let images = {}
    Object.entries(image_listings).forEach(gpair => {
        let [group_id, dimensional_images] = gpair;
        group_id = parseInt(group_id)
        images[group_id] = {};
        Object.entries(dimensional_images).forEach(dpair => {
            let [dimension, image] = dpair;
            image.id = parseInt(image.id)
            image.group_id = parseInt(image.group_id)
            images[group_id][dimension] = image;
        })
    })
    return images;
}

export const parse_int_cart_item_ids = (cart_listings) => {
    let carts = {};
    Object.entries(cart_listings).forEach(product_pair => {
        let [product_id, cart] = product_pair;
        cart.id = parseInt(cart.id);
        cart.user_id = parseInt(cart.user_id);
        cart.product_id = parseInt(cart.product_id);
        cart.quantity = parseInt(cart.quantity);
        carts[parseInt(product_id)] = cart;
    })
    return carts;
}

export const parse_int_product_ids = (product_listings) => {
    let products = {};
    Object.entries(product_listings).forEach(pair => {
        let [product_id, product] = pair;
        product.id = parseInt(product.id);
        product.image_ids = product.image_ids.map(id => parseInt(id));
        product.icon_ids = product.icon_ids.map(id => parseInt(id));
        product.user_id = parseInt(product.user_id)
        product.shop_id = parseInt(product.shop_id)
        products[product.id] = product;
    })
    return products;
}

export const parse_int_shop_ids = (shops_listings) => {
    let shops = {};
    Object.entries(shops_listings).forEach(pair => {
        let [shop_id, shop] = pair;
        shop.id = parseInt(shop.id);
        shop.user_id = parseInt(shop.user_id)
        shop.image_ids = shop.image_ids.map(id => parseInt(id));
        shop.icon_ids = shop.icon_ids.map(id => parseInt(id));
        shops[shop.id] = shop;
    })
    return shops;
}

export const parse_int_user_ids = (users_listings) => {
    let users = {};
    Object.entries(users_listings).forEach(pair => {
        let [user_id, user] = pair;
        user.id = parseInt(user.id);
        user.image_ids = user.image_ids.map(id => parseInt(id));
        user.icon_ids = user.icon_ids.map(id => parseInt(id));
        users[user.id] = user;
    })
    return users;
}

export const parse_int_review_ids = (reviews_listings) => {
    let reviews = {};
    Object.entries(reviews_listings).forEach(product_pair => {
        let [product_id, user_review] = product_pair;
        let product_review = {}
        Object.entries(user_review).forEach(user_pair =>{
            let [user_id, review] = user_pair;
            review.id = parseInt(review.id);
            review.user_id = parseInt(review.user_id);
            review.product_id = parseInt(review.product_id);
            review.rating = parseFloat(review.rating);
            product_review[parseInt(user_id)] = review;
        })
        reviews[parseInt(product_id)] = product_review;
    })
    return reviews;
}

export const parse_int_user_review_ids = (reviews_listings) => {
    let reviews = {};
    Object.entries(reviews_listings).forEach(product_pair => {
        let [product_id, review] = product_pair;
        review.id = parseInt(review.id);
        review.user_id = parseInt(review.user_id);
        review.product_id = parseInt(review.product_id);
        review.rating = parseFloat(review.rating);
        reviews[parseInt(product_id)] = review;
    })
    return reviews;
}

export const parse_int_listings = (listings) => {
    let parsed = listings;
    if ('products' in listings)
        parsed.products = parse_int_product_ids(listings.products);
    if ('images' in listings)
        parsed.images = parse_int_image_ids(listings.images);
    if ('shops' in listings)
        parsed.shops = parse_int_shop_ids(listings.shops);
    if ('users' in listings)
        parsed.users = parse_int_user_ids(listings.users);
    if ('reviews' in listings)
        parsed.reviews = parse_int_review_ids(listings.reviews);

    return parsed;
}

export function isNodeJs() {
    /*
        Way of detecting if running on Node.js
        @return true if the program is running in NodeJs.
     */
    return (typeof process !== 'undefined') &&
        ((process.release.name === 'node') ||
            // Node (>= 3.0.0) or io.js
            (process.release.name.search(/node|io.js/) !== -1) ||
            // Node (>= 0.10.0) or io.js
            (typeof process.versions.node !== 'undefined'));
}

export function isBrowser() {
    /*
        Way of detecting if running on browser.
        @return true if the program is runnin in the browser.
     */
    return (typeof window !== 'undefined')
}


function objectToString(obj) {
    let mapping = Object.entries(obj).map(pair => {
        let [k, v] = pair;
        if (typeof v === 'object' && v !== null)
            v = objectToString(v);
        return `${k}: ${v}`;
    })
    return `{ ${mapping.join(", ")} }`
}

export class debug {
    /*
        These are tools which help with debugging. They are not used in production.
    */
    static func(name, string) {
        if (isNodeJs())
            console.log(`\x1b[37;45;1m   FUNC  \x1b[0m \x1b[35m${name}: ${string}\x1b[0m`);
        if (isBrowser())
            console.log(`%c  FUNC  ` + `%c ${name}` + `%c: ${string}`, "background:blue;color:white", "color:blue", "color:BBBBBB");
    }

    static log(string) {
        if (isNodeJs())
            console.log(`\x1b[1;47;1m   LOG   \x1b[0m \x1b[37m${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c   LOG  ` + `%c ${string}`, "background:gray;color:white", "color:BBBBBB");
    }

    static condition(condition, string) {
        if (isNodeJs())
            console.log(`\x1b[37;46;1m   ${condition.toUpperCase()}   \x1b[0m \x1b[34m${string}\x1b[0m`);
        else if (isBrowser())
            console.log("%c  COND  " + `%c ${condition} (` + `%c${string}` + `%c)` + "%c => true", `background:#00AAAA;color:white`, `color:blue`, "color:BBBBBB", `color:blue`, "color: blue");

    }

    static data(name, string) {
        if (isNodeJs())
            console.log(`\x1b[37;42;1m   DATA   \x1b[0m \x1b[32m${name}=> ${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c  DATA  ` + `%c ${name} = ` + `%c${JSON.stringify(string)}`, "background:green;color:white", "color:green", "color:BBBBBB");
    }

    static event(name, string) {
        if (isNodeJs())
            console.log(`\x1b[1;45;1m  EVNT  \x1b[0m \x1b[37m${name}: ${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c  EVNT  ` + `%c ${name}` + `%c: ${string}`, "background:purple;color:white", "color:purple", "color:BBBBBB");
    }

    static error(string) {
        if (isNodeJs())
            console.log(`\x1b[1;41;1m   ERR  \x1b[0m \x1b[31m$${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c   ERR  ` + `%c ${string}`, "background:red;color:white", "color:red");
    }

    static react_error(action) {
        let {type, errors} = action;
        if (!errors && !type)
            throw new Error(`A different error was thrown: ${action}`)
        errors.forEach(error => {
            if (isNodeJs())
                console.log(`\x1b[1;41;1m  ${type}  \x1b[0m \x1b[31m$${error}\x1b[0m`);
            else if (isBrowser())
                console.log(`%c  ${type}  ` + `%c ${error}`, "background:red;color:white", "color:red");
        })
    }

    static react_data(action) {
        let {type, data} = action;
        let values = data;
        if (typeof data === 'object' && data !== null)
            values = Object.entries(data);

        if (isNodeJs())
            console.log(`\x1b[37;42;1m  ${type}  \x1b[0m \x1b[32m$${values}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c  ${type}  ` + `%c${values}`, "background:green;color:white", "color:BBBBBB");
    }

    static errorPromise(errors) {
        let messages = ["undefined error"];
        if (typeof errors === "object")
            messages = Object.entries(errors).map(pair => {
                let [id, error] = pair;
                return `${id}: ${error}`;
            });
        else if (typeof errors === "string" || errors instanceof String)
            messages = [errors];
        debug.error(messages.join("\n"));
        return Promise.resolve().then(() => {
            throw {responseJSON: [messages]}
        })
    }
}


export function isEmpty(obj) {
    if (Array.isArray(obj))
        return !!obj.length;
    else if (typeof obj === "object")
        return !!Object.keys(obj).length;
    else if (typeof obj === "string" || obj instanceof String)
        return !!obj.length;
    throw new Error("isEmpty can only take an iterable object");
}

export function urlParams(props) {
    if (props && props.match)
        return props.match.params;
    return null;
}

export function urlId(props) {
    let params = urlParams(props);
    return params && params.id;
}

export function urlPath(props) {
    if (props && props.match)
        return props.match.path;
    return null;
}

export function arrayEquals(arr1, arr2){
    if (arr1.length !== arr2.length)
        return false;
    let sorted1 = arr1.sort();
    let sorted2 = arr2.sort();

    for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i] !== sorted2[i])
            return false;
    }
    return true;
}

export function queryToString(ownProps){
    let query = permitProductQuery(ownProps);
    if (query instanceof String || typeof query === 'string')
        return query;
    else if (Array.isArray(query))
        return `[${query}]`
    let query_sorted_array = Object.entries(query).filter(pair => {
        let [key, value] = pair;
        return !(Array.isArray(value) && !value.length && !value);
    }).sort();
    return JSON.stringify(Object.fromEntries(query_sorted_array))
}

export const extractProductsParams = (ownProps) => {
    let [query, tags, materials, taxonomyPaths] = [null, null, null, null];
    let [tag, material, taxonomyPath] = [null, null, null];
    if (ownProps.location) {
        let params = new URLSearchParams(ownProps.location.search);
        query = params.get('query') || null;
        tag = params.get('tag');
        tags = tag && [tag] || params.get('tags') || [];
        material = params.get('material');
        materials = material && [material] || params.get('materials') || [];
        taxonomyPath = params.get('taxonomy_path');
        taxonomyPaths = taxonomyPath && [taxonomyPath] || params.get('taxonomy_paths') || [];
    } else {
        query = ownProps.query || null;
        tag = ownProps.tag;
        tags = tag && [tag] || ownProps.tags || [];
        material = ownProps.material;
        materials = material && [material] || ownProps.materials || [];
        taxonomyPath = ownProps.taxonomy_path;
        taxonomyPaths = taxonomyPath && [taxonomyPath] || ownProps.taxonomy_paths || [];
    }
    return [query, tags, materials, taxonomyPaths]
}

export const permitProductQuery = (ownProps) => {
    let [query, tags, materials, taxonomyPaths] = extractProductsParams(ownProps);
    let data = {};
    if (query) data['query'] = query;
    if (tags.length) data['tags'] = tags;
    if (materials.length) data['materials'] = materials;
    if (taxonomyPaths.length) data['taxonomy_paths'] = taxonomyPaths;
    return data;
}

export class Trie {
    /**
     * Creates a Trie tree for O(1) lookup queries
     */
    static setup(words){
        let root = new Trie();
        words.forEach(word => root.addChild(word));
        return root;
    }

    constructor(value) {
        this.value = value;
        this.children = null;
    }

    keys(){
        if (!this.children)
            return [];
        return Object.keys(this.children);
    }

    values(){
        if (!this.children)
            return [];
        return Object.values(this.children);
    }

    items(){
        if (!this.children)
            return [];
        return Object.entries(this.children);
    }

    get(item){
        if (this.has(item))
            return this.children[item];
        return null;
    }

    has(item){
        if (!this.children)
            return false;
        return item in this.children;
    }

    set(key, item){
        if (!this.children)
            this.children = {[key]: item};
        else
            this.children[key] = item;
    }

    addChild(word){
        if (word === "")
            return this.set(".", null);
        let [nextChar, rest] = [word[0], word.slice(1)];
        if (this.has(nextChar))
            return this.get(nextChar).addChild(rest);
        this.set(nextChar, new Trie(nextChar));
        this.get(nextChar).addChild(rest);
    }

    isMember(word){
        if (word === "")
            return this.has(".");
        let [nextChar, rest] = [word[0], word.slice(1)];
        if (nextChar === ".")
            return this.values().some(child => child.isMember(rest));
        else if (this.has(nextChar))
            return this.get(nextChar).isMember(rest);
        return false;
    }

    isLike(word){
        if (word === "")
            return true;
        let [nextChar, rest] = [word[0], word.slice(1)];
        if (nextChar === ".")
            return this.values().some(child => child.isLike(rest))
        else if (this.has(nextChar))
            return this.get(nextChar).isLike(rest);
        return false;
    }

    getLike(word){
        if (this.isLike(word))
            return this.getLikeHelper(word, [], "", this);
        return [];
    }

    getLikeHelper(word, found, traced, root){
        let [nextChar, rest] = [word[0], word.slice(1)];
        if (nextChar === "" || nextChar === undefined){
            if (root.isMember(traced))
                found.push(traced);
            this.items().forEach(pair => {
                let [child_char, child] = pair;
                if (child_char !== ".")
                    child.getLikeHelper(word, found, `${traced}${child_char}`, root)
            })
        } else if (this.isMember(traced) && traced !== "") {
            found.push(traced)
            return found;
        } else if (this.has(nextChar)) {
            this.get(nextChar).getLikeHelper(rest, found, `${traced}${nextChar}`, root);
        }
        return found;
    }
}
