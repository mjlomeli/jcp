/**
 * Product_page
 *
 * Creates the product_template show page. It needs a productId
 * to begin.
 */


import {connect} from 'react-redux';
import React from 'react';
import './product_template.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {fetchProduct} from "../../../actions/product_action";
import {fetchTheme, updateTheme} from "../../../actions/ui_theme_actions";
import Gallery from "../../user_controls/gallery/gallery";

const mapStateToProps = (state, ownProps) => {
    let products = state.entities.products;
    let productId = (ownProps.match && ownProps.match.params.id) || ownProps.productId || null;
    let product = (productId && products.all[productId]) || null;

    /*
    let productId = (ownProps.match && ownProps.match.params.id) || ownProps.productId || null;
    let productTheme = state.ui.theme.productTemplate[productId];
    let productEntity = state.entities.products.all[productId];
    let component = productTheme && productTheme.component || null;
    let userId = state.session.id || null;
     */

    return {
        //errors: errors.session, // need to add a ui or user_control errors
        products: products.all,
        productId: productId,
        product: product

        /*
        productId: productId,
        component: component,
        product: productEntity,
        reducer: "productTemplate",
        userId: userId
         */
    }
};

const mapDispatchToProps = dispatch => {
    return {
        //fetchTheme: () => dispatch(fetchTheme(ProductTemplate.REDUCER, id)) || null,
        //updateTheme: (ui) => dispatch(updateTheme(ProductTemplate.REDUCER, id, ui)) || null,
        fetchProduct: (productId) => dispatch(fetchProduct(productId)),
        //createCartItem: (productId) => dispatch(createCartItem(productId))
    }
};

let defaultGallery = {
    carousel: "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
    image1: "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
    image2: "https://i.etsystatic.com/21035245/r/il/5fc9a7/2038971731/il_794xN.2038971731_8ffn.jpg",
    image3: "https://i.etsystatic.com/21035245/r/il/477ace/2038972099/il_794xN.2038972099_8k6b.jpg",
    image4: "https://i.etsystatic.com/21035245/r/il/22765d/1991411394/il_794xN.1991411394_1nzf.jpg",
    imageIndex: 1,
    length: 4
}
let defaultProduct = {
    id: 0.1132884406e10,
    title: "Rattan Pen Holder Storage Basket Simple Desktop Decoration Tea Ceremony Storage Tube Household Tea Set Storage Dried Flower Flower Pot",
    price: 89.0,
    quantity: 2,
    description:
        "Rattan, round, fine workmanship, simple and stylish,It can be used as a pen holder, or as a vase for dried flowers, and it can also be used to store tea sets, which is environmentally friendly and natural, and has many uses",
    user_id: 0.581707326e9,
    shop_id: 0.33487777e8,
    image_ids: [0.3551435618e10, 0.3551435642e10, 0.355143556e10],
    icon_ids: [],
    category_id: null,
    creation_tsz: 0.1640262528e10,
    ending_tsz: 0.1650713328e10,
    original_creation_tsz: 0.1640262031e10,
    last_modified_tsz: 0.1640265521e10,
    state_tsz: 0.1640262031e10,
    state: "active",
    categories: [],
    currency_code: "USD",
    sku: [],
    tags: [],
    materials: ["Wicker"],
    shop_section_id: null,
    featured_rank: null,
    url: "https://www.etsy.com/listing/1132884406/rattan-pen-holder-storage-basket-simple?utm_source=educationalclone&utm_medium=api&utm_campaign=api",
    views: 2,
    num_favorers: 0,
    shipping_template_id: null,
    processing_min: 5,
    processing_max: 7,
    who_made: "i_did",
    is_supply: false,
    when_made: "2020_2021",
    item_weight: null,
    item_weight_unit: "oz",
    item_length: null,
    item_width: null,
    item_height: null,
    item_dimensions_unit: 0.0,
    is_private: false,
    style: null,
    non_taxable: false,
    is_customizable: false,
    is_digital: false,
    file_data: "",
    should_auto_renew: true,
    language: "en-US",
    has_variations: false,
    taxonomy_id: 0.1166e4,
    taxonomy_path: ["Home & Living", "Storage & Organization", "Baskets"],
    used_manufacturer: false,
    is_vintage: false,
    results_per_page: 100,
    page_number: 1
}

class ProductTemplate extends React.Component {
    /** Creates a product_template show page.
     * @param {Object} props                - The inputs passed to the components
     * @property {Object} state             - The data of the product_template having product_template: Object.
     * @property {Object} onclick           - The onclick listener.
     * @property {Function} fetchProduct    - Gets the product_template if the productId is provided.
     * @type {(product_template: Object=null, productId: number=null)  => Product}
     */
    constructor(props) {
        super(props);
        this.state = {}
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    /** When the page is refreshed, it asks if this page needs to be resolved and requests a resolution.
     * @type {()  => VoidFunction}
     * */
    componentDidMount() {
        if (!this.props.gallery)
            this.setState({gallery: defaultGallery});
        else
            this.setState({gallery: this.props.gallery})

        if (!this.isValid())
            return this.resolve();
    }

    /** Action when the product_template page has a click.
     * @param {Object} e                - The inputs passed to the components
     * @type {(e: Event)  => VoidFunction}
     */
    onClick(e) {
        e.preventDefault();
        let index = parseInt(e.currentTarget.dataset.index);
        this.setState({imageIndex: index});
    }


    /** Action when the product_template page has the mouse enter.
     * @param {Object} e                - The inputs passed to the components
     * @type {(e: Event)  => VoidFunction}
     */
    onMouseEnter(e) {
        e.preventDefault();
    }


    /** Action when the product_template page has the mouse leave.
     * @param {Object} e                - The inputs passed to the components
     * @type {(e: Event)  => VoidFunction}
     */
    onMouseLeave(e) {
        e.preventDefault();
    }

    /** Reponse if the current state is able to render with its current properties
     * @return {true | false} - The response if the current state is able to render with its current properties
     * @type {()  => true | false}
     */
    isValid(){
        return this.state.product ||
            this.props.productId && (this.props.productId in this.props.products) ||
            this.state.productId && (this.state.productId in this.props.products)
    }

    /** Tries to resolve any issues when the data isn't sufficient to render the page.
     * @return {null} - Returns null for shorthand ending in an if statement
     **/
    resolve(){
        if (this.props.product)
            this.setState({product: this.props.product});
        else if (this.props.productId)
            this.props.fetchProduct(this.props.productId);
        else if (this.props.match && this.props.match.params.id)
            this.props.fetchProduct(this.props.match.params.id);
        else
            this.setState({product: defaultProduct});
        return null;
    }

    getProduct(){
        if (this.state.product)
            return this.state.product;
        else if (this.props.productId && this.props.products)
            return this.props.products[this.props.productId];
        else
            console.warn("Product_page: unable to find product.")
        return null;
    }


    description(product){
        return <div className="product-template-items-description">
            <h2>Description</h2>{
            product.description.replace(/(\\r\\n|\\n|\\r)/gm, "\n").replace(/(\\t)/gm, "\t").split("\n").map(
                (line, index) => <p key={index}>{line}</p>
            )
        }</div>
    }

    addToCart(e){
        e.preventDefault();
        //this.props.createCartItem(this.props.productId);
    }

    options(){
        let product = this.getProduct();
        return <div className="product-template-items-options">
            <h3>{product.store}</h3>
            <h2>{product.title}</h2>
            <h2>{product.price}</h2>
            <form onSubmit={this.addToCart.bind(this)}>
                <button type="submit" className="product-template-items-options-submit">Proceed to checkout</button>
            </form>
        </div>
    }

    /** Renders the component
     * @returns {JSX.Element}
     */
    render() {
        if (!this.isValid())
            return this.resolve();
        let product = this.getProduct();

        let areas = [
            'gallery gallery options',
            'details details options'
        ]

        let images = product.image_urls || product.images ||  null;
        let gallery = {
            carousel: images && images[0] || null,
            image1: images && images[0] || null,
            image2: images && images[1] || null,
            image3: images && images[2] || null,
            image4: images && images[3] || null,
            imageIndex: 1,
            length: 4
        }

        let components = {
            gallery: this.gallery(gallery || product.images || product.image_urls || null),
            details: this.description(product),
            options: this.options()
        }


        return this.gridLayout(areas, components, "product-template-grid", "product-template-items")
    }


    gridLayout(areas, components, classGrid, classElements){
        let a = areas.map(r => `'${r}'`)
        let s = {gridTemplateAreas: a.join(' ')}
        return <>
            <div className={`global-gridlayout-grid ${classGrid || ""}`} style={s}>{
                Object.entries(components).map(
                    (obj, i) => {
                        let [key, value] = obj;
                        return <div key={i}
                                    className={`global-gridlayout-items ${classElements || ""}`}
                                    style={{gridArea: `${key}`}}>{value}
                        </div>
                    })
            }</div>

        </>
    }

    gallery(gallery){
        let mainImage = <>
            {this.buttonLeft()}
            <img id="gallery-image" className="gallery-carousel" src={gallery.carousel} alt="img"/>
            {this.buttonRight()}
        </>

        let areas = [];
        let components = {'carousel': mainImage}
        for (let i = 0; i < gallery.length; i++){
            let row = [`image${i+1}`].concat(Array(gallery.length-1).fill('carousel'));
            areas.push(row.join(" "));
            components[i+1] = this.generateImage(i+1);
        }

        return this.gridLayout(areas, components, "product-template-gallery-grid", "gallery-items")
    }

    leftClick() {
        let gallery = this.state.gallery;
        let imageIndex = gallery.imageIndex <= 1 ? gallery.length : gallery.imageIndex - 1;
        let carousel = gallery[`image${imageIndex}`];
        this.setState({imageIndex, carousel})
    }

    rightClick() {
        let gallery = this.state.gallery;
        let imageIndex = gallery.imageIndex <= 1 ? gallery.length : gallery.imageIndex - 1;
        let carousel = gallery[`image${imageIndex}`];
        this.setState({imageIndex, carousel})
    }

    generateImage(index){
        return <img src={this.state.gallery[`image${index}`]} alt="img" data-index={index}/>
    }

    buttonLeft() {
        return <svg className="gallery-button gallery-button-left"
                    onClick={() => this.leftClick()}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z"></path>
        </svg>
    }

    buttonRight() {
        return <svg className="gallery-button gallery-button-right"
                    onClick={() => this.rightClick()}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z"></path>
        </svg>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTemplate)