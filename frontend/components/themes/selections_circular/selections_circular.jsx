import {connect} from 'react-redux';
import React from 'react';
import './selections_circular.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CircularThumbnail from "../../user_controls/circular_thumbnail/circular_thumbnail";
import {fetchRandomProducts} from "../../../actions/product_action";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";


const mapStateToProps = ({entities, errors}, ownProps) => {
    let productIds = ownProps.productIds || Object.keys(entities.products);
    return {
        productIds: productIds.slice(0, 6)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
});

class SelectionsCircular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductIds = this.props.productIds;
        let postProductIds = nextProps.productIds;

        if (!preProductIds || !postProductIds)
            return true;
        else if (preProductIds.length !== postProductIds.length)
            return true;
        else if (!preProductIds.every(preId => postProductIds.includes(preId)))
            return true;
        return false;
    }

    isRenderValid() {
        return this.props.productIds && this.props.productIds.length;
    }

    resolve() {
        if (!this.props.productIds || this.props.productIds.length === 0)
            this.props.fetchRandomProducts(10);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let layout1x6 = [];
        let components = {}
        this.props.productIds.forEach((productId, idx) => {
            layout1x6.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CircularThumbnail key={`${productId}`} productId={productId}
                                                           product={Product.findById(productId)}
                                                           images={Image.findByProductId(productId)}
                                                           className="selections-circular"
                                                           classTitle="selections-circular-title"
                                                           classImage="selections-circular-image"
                                                           classElements="selections-circular-elements"
                                                           classHover="selections-circular-hover"
                                                           classTitleHover="selections-circular-title-hover"
                                                           classImageHover="selections-circular-image-hover"/>
        })

        let title = this.props.title ? <h2 className="selections-circular-titles">{this.props.title}</h2> : null;
        let description = this.props.description ? <label className="selections-circular-descriptions">{this.props.description}</label> : null;
        return <div>
            {title}
            {description}
            <GridLayout areas={[layout1x6.join(" ")]} components={components} className="selections-circular-grid"
                        classElements="selections-circular-items"/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionsCircular);