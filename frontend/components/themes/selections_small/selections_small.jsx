import {connect} from 'react-redux';
import React from 'react';
import './selections_small.css'
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

class SelectionsSmall extends React.Component {
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
        this.props.productIds.forEach((productId, idx) => {
            layout.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })

        let title = <h2 className="selections-small-titles">{this.props.title}</h2>
        let description = <label className="selections-small-descriptions">{this.props.description}</label>
        return <>
            {title}
            {description}
            <GridLayout areas={[layout.join(" ")]} components={components} className="selections-small-grid"
                        classElements="selections-small-items"/>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionsSmall);