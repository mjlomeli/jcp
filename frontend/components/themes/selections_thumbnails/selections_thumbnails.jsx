import {connect} from 'react-redux';
import React from 'react';
import './selections_thumbnails.css'
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
        description: ownProps.description || "",
        numRows: ownProps.numRows || 2,
        align: ownProps.align || "center"
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
});

class SelectionsThumbnails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        let layout = [];
        let components = {}
        let indices = [];
        let offset = Math.ceil(this.props.productIds.length / this.props.numRows);
        this.props.productIds.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === offset) {
                layout.push(indices.join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        if (indices.length){
            let placeholder = Array.from(Array(offset - indices.length)).map(_ => "-");
            layout.push(indices.concat(placeholder).join(" "));
        }
        let title = this.props.title ? <p className="selections-thumbnails-text">{this.props.title}</p> : null;
        let description = this.props.description ? <h2 className="selections-thumbnail-titles">{this.props.description}</h2> : null;
        return <>
            {title}
            {description}
            <GridLayout areas={layout} components={components} className="selections-thumbnails-grid"
                           classElements="selections-thumbnails-items"/>
            </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionsThumbnails);