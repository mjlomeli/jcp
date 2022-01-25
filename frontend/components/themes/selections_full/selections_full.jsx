import {connect} from 'react-redux';
import React from 'react';
import './selections_full.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CardListing from "../../user_controls/card_listing/card_listing";
import {fetchRandomProducts} from "../../../actions/product_action";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";


const mapStateToProps = ({entities, errors}, ownProps) => {
    let productIds = ownProps.productIds || Object.keys(entities.products);
    let numRows = ownProps.numRows || ownProps.numCols && Math.ceil(productIds.length / ownProps.numCols) || 1;
    let numCols = ownProps.numCols || Math.ceil(productIds.length / numRows) || productIds.length
    return {
        productIds: productIds,
        title: ownProps.title || "",
        description: ownProps.description || "",
        numRows: numRows,
        numCols: numCols
    }

};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
});

class SelectionsFull extends React.Component {
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
        let title = <h2 className="selections-full-thumbnail-titles">{this.props.title}</h2>;
        let description = <label className="selections-full-descriptions">{this.props.description}</label>;
        let text = <div>{title}{description}</div>
        let components = {'text': text}
        let indices = [];

        let layout = [Array.from(Array(this.props.numCols)).map(_ => "text").join(" ")];
        for (let idx = 0; idx < this.props.numRows * this.props.numCols; idx++){
            if (idx >= this.props.productIds.length) {
                indices.push("-")
            }
            else {
                indices.push(`comp_${idx}`)
                let productId = this.props.productIds[idx];
                if (indices.length === this.props.numCols) {
                    layout.push(indices.join(" "))
                    indices = [];
                }
                components[`comp_${idx}`] = <CardListing key={`${productId}`} length={50} productId={productId}
                                                         product={Product.findById(productId)}
                                                         images={Image.findByProductId(productId)}/>
            }
        }
        if (indices.length){
            let placeholder = Array.from(Array(this.props.numCols - indices.length)).map(_ => "-");
            layout.push(indices.concat(placeholder).join(" "));
        }
        return <GridLayout areas={layout}
                           components={components}
                           className="selections-full-grid"
                           classElements="selections-full-items"/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionsFull);