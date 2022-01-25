import {connect} from 'react-redux';
import React from 'react';
import './selections_bordered.css'
import CardThumbnail from "../../user_controls/card_thumbnail/card_thumbnail";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {fetchRandomProducts} from "../../../actions/product_action";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";


const mapStateToProps = ({entities, errors}, ownProps) => {
    let productIds = ownProps.productIds || Object.keys(entities.products);
    return {
        productIds: productIds,
        title: ownProps.title || "",
        description: ownProps.description || ""
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
});

class SelectionsBordered extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductIds = this.props.productIds;
        let postProductIds = nextProps.productIds;

        let preTitle = this.props.title;
        let postTitle = nextProps.title;

        let preDescription = this.props.description;
        let postDescription = nextProps.description;

        if (!preProductIds || !postProductIds)
            return true;
        else if (preProductIds.length !== postProductIds.length)
            return true;
        else if (!preProductIds.every(preId => postProductIds.includes(preId)))
            return true;
        else if (preTitle !== postTitle)
            return true;
        else if (preDescription !== postDescription)
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
        let layout = [];
        let title = this.props.title ? <p className="selections-bordered-title">{this.props.title}</p> : null;
        let description = this.props.description ? <h2 className="selections-bordered-thumbnail-titles">{this.props.description}</h2> : null;
        let text = <div className="selections-bordered-text">{title}{description}</div>
        let components = {'text': text}
        let indices = ['text', 'text'];
        this.props.productIds.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === Math.floor((this.props.productIds.length + 2) / 2)) {
                layout.push(indices.join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardThumbnail key={`${productId}`} productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        return <GridLayout areas={layout} components={components} className="selections-bordered-grid"
                           classElements="selections-bordered-items"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionsBordered);