import {connect} from 'react-redux';
import React from 'react';
import './selections_large.css'
import CardThumbnail from "../../user_controls/card_thumbnail/card_thumbnail";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {fetchRandomProducts} from "../../../actions/product_action";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";


const mapStateToProps = ({entities, errors}, ownProps) => {
    let productIds = ownProps.productIds || Object.keys(entities.products);
    let mainId = ownProps.mainId || Object.keys(entities.products)[0];
    return {
        productIds: productIds,
        mainId: mainId,
        title: ownProps.title || "",
        description: ownProps.description || ""
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
});

class SelectionsLarge extends React.Component {
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

    mainProduct(){
        let mainId = this.props.mainId;
        return <CardThumbnail productId={mainId} product={Product.findById(mainId)}
                              images={Image.findByProductId(mainId)}/>
    }

    selections(numRows=2, productIds=this.props.productIds){
        let components = {"main": this.mainProduct()};
        let areas = []
        let layout = [];
        productIds.forEach((productId, idx) => {
            layout.push(`comp_${idx}`)
            if (layout.length === Math.floor(productIds.length / numRows)) {
                areas.push(`main main ${layout.join(" ")}`)
                layout = [];
            }
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })

        return <GridLayout areas={areas}
                           components={components}
                           className="selections-large-grid"
                           classElements="selections-large-items"/>
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        let title = this.props.title ? <h2 className="selections-large-titles">{this.props.title}</h2> : null;
        let description = this.props.description ? <label className="selections-large-descriptions">{this.props.description}</label> : null;
        return <>
            {title}
            {description}
            {this.selections(2, this.props.productIds)}
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionsLarge);