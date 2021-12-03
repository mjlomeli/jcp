/**
 * Product
 *
 * Creates the product_template show page. It needs a productId
 * to begin.
 */


import {connect} from 'react-redux';
import React from 'react';
import './product_template.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {fetchProduct} from "../../../actions/product_actions";
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
        fetchProduct: (productId) => dispatch(fetchProduct(productId))
    }
};

let defaultProduct = {
    title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
    rating: 4.6,
    ratingCount: 1399,
    store: "Plexida",
    price: 25.99,
    discount: 0.2,
    freeShipping: true,
    description: "OTL Headphone Amplifier\n" +
        "Hello, my name is Andrey.\n" +
        "Let me present you the Headphone Tube Amplifier. It is designed specifically for high impedance headphones, rated from 250 Ohms and higher (300-600 Ohms).\n" +
        "Schematically, this is a SRPP cascade on russian 6N3P vacuum tubes. The power supply provides stabilization and slow rise anode voltage that ensures the extension of the tubes life.\n" +
        "The handcrafted case is designed as a mini tower. Its dimensions: width - 83 mm, depth - 98 mm, height - 170 mm, weight - 1.5 kg. The body is made of MDF and then covered with natural walnut veneer. Wood is protected by two layers of oil wax composition. The amplifier panels are made of aluminum and coated with a protective layer of varnish. A manually wound power transformer is placed at the base of the case.\n" +
        "The amplifier is projected to be powered from a AC 220-230V and has a standard RCA audio input, a 6.3 mm headphone jack with fixation.\n" +
        "The set includes: an amplifier, power cord, 6N3P-EV vacuum tubes (EV grade – long life 5000 hrs).\n" +
        "Originating this appliance I paid much attention to every single production process and each particular detail. This device is assembled of high quality components and has come thorough electronics testing and thermal control.\n" +
        "This instrument will brings you a pleasurable musical joy and completely involves you into a great high-quality sound.\n" +
        "If you have any questions, please feel free to contact me.\n" +
        "Shipping will include tracking. The amp will be carefully packed.",
    image_urls: [
        "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
        "https://i.etsystatic.com/21035245/r/il/5fc9a7/2038971731/il_794xN.2038971731_8ffn.jpg",
        "https://i.etsystatic.com/21035245/r/il/477ace/2038972099/il_794xN.2038972099_8k6b.jpg",
        "https://i.etsystatic.com/21035245/r/il/22765d/1991411394/il_794xN.1991411394_1nzf.jpg"]
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
        if (!this.isValid())
            return this.resolve();
    }

    /** Action when the product_template page has a click.
     * @param {Object} e                - The inputs passed to the components
     * @type {(e: Event)  => VoidFunction}
     */
    onClick(e) {
        e.preventDefault();
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
            console.warn("Product: unable to find product.")
        return null;
    }


    description(product){
        return <div>
            <h2>Description</h2>{
            product.description.replace(/(\\r\\n|\\n|\\r)/gm, "\n").replace(/(\\t)/gm, "\t").split("\n").map(
                (line, index) => <p key={index}>{line}</p>
            )
        }</div>
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

        let options = <>
            <h3>{product.store}</h3>
            <h2>{product.title}</h2>
            <h2>{product.price}</h2>
            <a href={`#`}>Add to cart</a>
        </>

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
            gallery: <Gallery gallery={gallery || product.images || product.image_urls || null}/>,
            details: this.description(product),
            options: options
        }
        return <GridLayout areas={areas} components={components} />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTemplate)