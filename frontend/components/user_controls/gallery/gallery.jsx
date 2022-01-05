import {connect} from 'react-redux';
import React from 'react';
import './gallery.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {Product} from "../../../lib/product";
import {fetchProduct, resetProductError} from "../../../actions/product_action";
import {fetchImageByProductId} from "../../../actions/image_action";


const defaultProductId = 1133353182;

function findProductId(ownProps) {
    if (!ownProps) return null;
    if (ownProps.productId)
        return parseInt(ownProps.productId);
    else if (ownProps.match && ownProps.match.params && ownProps.match.params.id)
        return parseInt(ownProps.match.params.id);
    return null;
}

function findImages(product) {
    if (!product) return null;
    let images = product.imagesMedium();
    if (!images || images.length === 0) return null;
    return images;
}

const mapStateToProps = (state, ownProps) => {
    let productId = findProductId(ownProps);
    let products = state.entities.products;
    let product = Product.findById(productId);

    let images = state.entities.groupImages;
    let imagesMedium = findImages(product);

    return {
        products: products,
        productId: productId,
        product: product,
        images: images,
        imagesMedium: imagesMedium
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    fetchImageByProductId: (productId) => dispatch(fetchImageByProductId(productId)),
    resetProductError: productId => dispatch(resetProductError(productId))
});

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: 0};

        this.image = null;
        this.leftButton = React.createRef();
        this.rightButton = React.createRef();

        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setState({index: index})
    }

    leftClick() {
        let images = this.props.imagesMedium;
        let index = this.state.index;
        index <= 0 ? index = images.length - 1 : index--;
        this.setState({index: index});
    }

    rightClick() {
        let images = this.props.imagesMedium;
        let index = this.state.index;
        index >= images.length-1 ? index -= images.length-1 : index++
        this.setState({index: index});
    }

    imageSelections(index) {
        let images = this.props.imagesMedium;
        return <img className="gallery-image-selections" onClick={this.onClick.bind(this)} src={images[index].source()}
                    alt="img" data-index={index}/>
    }

    leftButtonComponent() {
        return <svg className="gallery-button gallery-button-left"
                    ref={this.leftButton}
                    onClick={() => this.leftClick()}
                    onMouseEnter={(e) => this.toggleButtonVisibility(e)}
                    onMouseLeave={(e) => this.toggleButtonVisibility(e)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z"></path>
        </svg>
    }

    rightButtonComponent() {
        return <svg className="gallery-button gallery-button-right"
                    ref={this.rightButton}
                    onClick={() => this.rightClick()}
                    onMouseEnter={(e) => this.toggleButtonVisibility(e)}
                    onMouseLeave={(e) => this.toggleButtonVisibility(e)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z"></path>
        </svg>
    }

    carousel() {
        let images = this.props.imagesMedium;
        let carousel = images[this.state.index]

        return <div className="gallery-carousel">
            {this.leftButtonComponent()}
            <img className="gallery-carousel-image"
                 src={carousel.source()}
                 onMouseEnter={(e) => this.toggleButtonVisibility(e)}
                 onMouseLeave={(e) => this.toggleButtonVisibility(e)}
                 alt="img"/>
            {this.rightButtonComponent()}
        </div>
    }

    toggleButtonVisibility(e) {
        this.leftButton.current.classList.toggle('visibility-transition')
        this.rightButton.current.classList.toggle('visibility-transition')
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = findProductId(this.props);
        if (Product.hasProductError(productId)) {
            this.props.history.push(`/gallery/${defaultProductId}`);
            this.props.resetProductError(this.props.productId);
            return false;
        }
        return true;
    }

    isRenderValid() {
        return !!this.props.product && !!this.props.imagesMedium;
    }

    resolve() {
        if (!this.props.product)
            this.props.fetchProduct(this.props.productId)
        else if (!this.props.imagesMedium) {
            this.props.fetchImageByProductId(this.props.productId)
        }
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let images = this.props.imagesMedium;
        let areas = [];
        let components = {'carousel': this.carousel()}
        for (let i = 0; i < images.length; i++) {
            let row = [`image${i}`].concat(Array(images.length - 1).fill('carousel'));
            areas.push(row.join(" "));
            components[`image${i}`] = this.imageSelections(i);
        }
        return <GridLayout areas={areas} components={components} classElements="gallery-elements"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);