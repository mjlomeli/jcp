import {connect} from 'react-redux';
import React, {Fragment} from 'react';
import './gallery.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {Product} from "../../../lib/product";
import {fetchProductListing, resetProductErrors} from "../../../actions/product_action";
import {urlId} from "../../../utils/tools";

const mapStateToProps = (state, ownProps) => {
    let productId = Product.findIDFromProps(ownProps);
    let product = Product.findById(productId);
    let images = product && product.imagesFull();

    return {
        productId: productId,
        product: product,
        images: images.slice(0, 4)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: productId => dispatch(fetchProductListing(productId))
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
        let index = this.state.index;
        index <= 0 ? index = this.props.images.length - 1 : index--;
        this.setState({index: index});
    }

    rightClick() {
        let index = this.state.index;
        index >= this.props.images.length-1 ? index -= this.props.images.length-1 : index++
        this.setState({index: index});
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
        if (!this.props.images || !this.props.images.length)
            return null;
        let carousel = this.props.images[this.state.index]

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
        let preProductId = this.props.productId;
        let postProductId = nextProps.productId;

        let preIndex = this.state.index;
        let postIndex = nextState.index;

        if (preProductId !== postProductId)
            return true;
        else if (preIndex !== postIndex)
            return true;
        return false;
    }

    isRenderValid() {
        return !!this.props.product && !!this.props.images;
    }

    resolve() {
        if (!Product.hasError(this.props.productId))
            this.props.fetchProduct(this.props.productId)
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let productId = this.props.productId;
        let areas = ['image carousel carousel carousel carousel'];
        let components = {'carousel': this.carousel()}
        components['image'] = <Fragment>{
            this.props.images.map((image, idx) => {
                return <img key={`${productId}_${idx}`} className="gallery-image-selections" onClick={this.onClick.bind(this)} src={image.source()} alt="img" data-index={idx}/>
        })}
        </Fragment>
        return <GridLayout areas={areas} components={components} className="gallery-grid" classElements="gallery-elements"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);