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
import Gallery from "../../user_controls/gallery/gallery";
import {fetchTheme} from "../../../actions/ui_theme_actions";
import {fetchProduct} from "../../../actions/product_actions";
import {Link} from "react-router-dom";


const mapStateToProps = (state, ownProps) => {
    let productId = (ownProps.match && ownProps.match.params.id) || ownProps.productId || null;
    let productTheme = state.ui.theme.productTemplate[productId];
    let productEntity = state.entities.products.all[productId];
    let component = productTheme && productTheme.component || null;
    let userId = state.session.id || null;

    return {
        //errors: errors.session, // need to add a ui or user_control errors
        productId: productId,
        component: component,
        product: productEntity,
        reducer: "productTemplate",
        userId: userId
    }
};

const mapDispatchToProps = (dispatch, ownProp) => {
    let id = ownProp.match.params.id;
    return {
        fetchTheme: () => dispatch(fetchTheme(ProductTemplate.REDUCER, id)) || null,
        updateTheme: (ui) => dispatch(updateTheme(ProductTemplate.REDUCER, id, ui)) || null,
        fetchProduct: (productId) => dispatch(fetchProduct(productId)) || null
    }
};

let defaultProduct = {
    productId: 1,
    title: "Personalized Name Puzzle With Pegs, Personalized Name Puzzle With Pegs, New Baby Gift",
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
    images: [
        "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
        "https://i.etsystatic.com/21035245/r/il/5fc9a7/2038971731/il_794xN.2038971731_8ffn.jpg",
        "https://i.etsystatic.com/21035245/r/il/477ace/2038972099/il_794xN.2038972099_8k6b.jpg",
        "https://i.etsystatic.com/21035245/r/il/22765d/1991411394/il_794xN.1991411394_1nzf.jpg"]
}

class ProductTemplate extends React.Component {
    static REDUCER = "productTemplate";
    /** Creates a product_template show page.
     * @param {Object} props                - The inputs passed to the components
     * @property {Object} state             - The data of the product_template having product_template: Object.
     * @property {Object} onclick           - The onclick listener.
     * @property {Function} fetchProduct    - Gets the product_template if the productId is provided.
     * @type {(product_template: Object=null, productId: number=null)  => Product}
     */
    constructor(props) {
        super(props);
        console.log(props)
        if (props.product) {
            this.state = {
                component: props.component,
                productId: props.productId,
                product: props.product
            }
        }
        else
            this.state = {component: props.component, product: defaultProduct}

        this.id = this.props.productId || this.props.match && this.props.match.params.id;
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    /** When the page is refreshed, it asks if this page needs to be resolved and requests a resolution.
     * @type {()  => VoidFunction}
     * */
    componentDidMount() {
        this.props.fetchProduct(this.id);
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
        let theme = this.props.fetchTheme();
        return this.props.component || this.state.component || theme && theme.component || false;
    }

    /** Tries to resolve any issues when the data isn't sufficient to render the page.
     * @return {null} - Returns null for shorthand ending in an if statement
     **/
    resolve(){

    }

    /** Renders the component
     * @returns {JSX.Element}
     */
    render(){
        let product = this.props.product;
        if (!product)
            return null;

        let areas = [
            'gallery gallery options',
            'details details options'
        ]

        let description = (!product.description) ? null : <div>
            <h2>Description</h2>{
            product.description.replace("\\r\\n", "\\n").replace("\\r", "").split("\\n").map(
                (line, index) => <p key={index}>{line}</p>
            )
        }</div>

        let options = <>
            <h3>{product.store}</h3>
            <h2>{product.title}</h2>
            <h2>{product.price}</h2>
            <a href={`#`}>Add to cart</a>
        </>

        let components = {
            gallery: <Gallery images={product.images || product.image_urls || null}/>,
            details: description,
            options: options
        }

        return <GridLayout areas={areas} components={components} />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTemplate)

