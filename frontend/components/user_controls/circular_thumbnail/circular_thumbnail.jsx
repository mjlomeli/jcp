import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import GridLayout from "../grid_layout/grid_layout";
import {Product} from "../../../lib/product";
import {fetchProduct, resetProductError} from "../../../actions/product_action";
import {fetchImageByProductId} from "../../../actions/image_action";


const defaultProductId = 1133353182;

function findProductId(ownProps){
    if (!ownProps) return null;
    if (ownProps.productId)
        return parseInt(ownProps.productId);
    else if (ownProps.match && ownProps.match.params && ownProps.match.params.id)
        return parseInt(ownProps.match.params.id);
    return null;
}

function findImage(product){
    if (!product) return null;
    let images = product.imagesMedium();
    if (!images || images.length === 0) return null;
    let image = null;
    images.forEach(img => { if (!!img) return image = img; })
    return image;
}

const mapStateToProps = (state, ownProps) =>{
    let productId = findProductId(ownProps);
    let products = state.entities.products;
    let product = Product.findById(productId);

    let images = state.entities.groupImages;
    let image = findImage(product);

    return {
        products: products,
        productId: productId,
        product: product,
        images: images,
        image: image
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    fetchImageByProductId: (productId) => dispatch(fetchImageByProductId(productId)),
    resetProductError: productId => dispatch(resetProductError(productId))
});


const defaultTitleStyle = {
    position: "relative",
    fontWeight: "640",
    fontSize: "1em",
    wordWrap: "break-word",
    borderBottom: "0.1em solid black",
    textAlign: "center"
}
const defaultImageStyle = {width: "200px", height: "200px"}

class CircularThumbnail extends React.Component {
    #titleStyle = {}
    #imageStyle = {borderRadius: "50%"}

    static CLASS_PROPS = ['className', 'classImage', 'classTitle', 'classGrid', 'classElements'];
    static DATA_PROPS = ['title', 'image', 'link'];

    static hasClassProps(props) {
        return CircularThumbnail.CLASS_PROPS.some(elem => elem in props)
    }

    static hasComponentData(props) {
        return CircularThumbnail.DATA_PROPS.some(elem => elem in props)
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.usingDefaultClass = !CircularThumbnail.hasClassProps(props);
        this.usingDefaultData = !CircularThumbnail.hasComponentData(props);

        this.className = '';
        this.classImage = '';
        this.classTitle = '';
        this.classGrid = '';
        this.classElements = '';

        this.classHover = '';
        this.classImageHover = '';
        this.classTitleHover = '';

        this.thumbnail = React.createRef();
        this.image = React.createRef();
        this.title = React.createRef();

        this.onmouseenter = this.onMouseEnter.bind(this);
        this.onmouseleave = this.onMouseLeave.bind(this);
        this.onmouseenterimage = this.onMouseEnterImage.bind(this);
        this.onmouseleaveimage = this.onMouseLeaveImage.bind(this);

        this.#assignClassNames(props);
    }

    #assignClassNames(props) {
        if (!this.usingDefaultClass) {
            this.classImage = props.classImage || '';
            this.classTitle = props.classTitle || '';
        } else {
            this.#titleStyle = {...this.#titleStyle, ...defaultTitleStyle};
            this.#imageStyle = {...this.#imageStyle, ...defaultImageStyle};
        }

        this.className = props.className || '';
        this.classGrid = props.classGrid || '';
        this.classElements = props.classElements || '';

        this.classHover = props.classHover || '';
        this.classImageHover = props.classImageHover || '';
        this.classTitleHover = props.classTitleHover || '';
    }

    onMouseEnter(e) {
        if (!this.classHover) return;

        this.thumbnail.current.classList.toggle(this.classHover);
        if (this.classImageHover) {
            this.image.current.classList.toggle(this.classImageHover);
        }
        if (this.classTitleHover)
            this.title.current.classList.toggle(this.classTitleHover);
    }

    onMouseLeave(e) {
        if (!this.classHover) return;

        this.thumbnail.current.classList.toggle(this.classHover);
        if (this.classImageHover)
            this.image.current.classList.toggle(this.classImageHover);
        if (this.classTitleHover)
            this.title.current.classList.toggle(this.classTitleHover);
    }

    onMouseEnterImage(e) {
        if (!this.classImageHover) return;
        if (!this.image.current.classList.contains(this.classImageHover))
            this.image.current.classList.toggle(this.classImageHover);
    }

    onMouseLeaveImage(e) {
        if (!this.classImageHover) return;
        if (this.image.current.classList.contains(this.classImageHover))
            this.image.current.classList.toggle(this.classImageHover);
    }

    resize(title) {
        if (title && title.length > 17) {
            return `${title.slice(0, 17)}...`
        }
        return title;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let productId = findProductId(this.props);
        if (Product.hasProductError(productId)) {
            this.props.history.push(`/circular_thumbnail/${defaultProductId}`);
            this.props.resetProductError(this.props.productId);
            return false;
        }
        return true;
    }

    isRenderValid(){
        return !!this.props.product && !!this.props.image;
    }

    resolve(){
        if (!this.props.product)
            this.props.fetchProduct(this.props.productId)
        else if (!this.props.image)
            this.props.fetchImageByProductId(this.props.productId)
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let product = this.props.product;
        let image = this.props.image;

        let areas = ['image', 'image', 'image', 'image', 'title']
        let components = {
            'image': <div className={this.classImage} style={this.#imageStyle} ref={this.image}>
                <img alt="img" src={image.source()}
                     style={{borderRadius: "50%", width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>,
            'title': <label className={this.classTitle} ref={this.title} style={this.#titleStyle}>{this.resize(product.title)}</label>
        }
        return <Link to={`/product/${product.id}`} onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} style={{textDecoration: "inherit", color: "inherit"}}>
            <GridLayout
                className={this.className}
                classElements={this.classElements}
                areas={areas}
                components={components} refGridLayout={this.thumbnail}/>
        </Link>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircularThumbnail);