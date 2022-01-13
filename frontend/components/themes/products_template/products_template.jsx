import {connect} from 'react-redux';
import React from 'react';
import './products_template.css'
import CardFeatured from "../../user_controls/card_featured/card_featured";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import ProductsList from "../../user_controls/product_list/products_list";
import CardThumbnail from "../../user_controls/card_thumbnail/card_thumbnail";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";
import {fetchRandomProducts} from "../../../actions/product_action";


const mapStateToProps = ({entities, errors}) => {
    let productIds = Object.keys(entities.products);
    return {
        productIds: productIds,
        featured: productIds[0],
        products: productIds.slice(0, 20),
        recommendation: productIds.slice(0, 4)
    };
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n))
});

class ProductsTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, lastPage: 99, perPage: 20}
    }

    featuredProduct() {
        return <CardFeatured productId={this.props.featured}/>
    }


    productList(){
        return <div className="product-template-productlist">
            <ProductsList productIds={this.props.products}/>
        </div>
    }

    recommended(){
        let components = {};
        let layout1x4 = [];
        this.props.recommendation.slice(1).forEach((productId, idx) => {
            layout1x4.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        return <GridLayout areas={[layout1x4.join(" ")]} components={components}
                           classGrid="product-template-rec-grid" classElements="product-template-rec-items"/>
    }

    isRenderValid() {
        return this.props.productIds && this.props.productIds.length >= 40;
    }

    resolve() {
        if (!this.props.productIds || this.props.productIds.length < 40)
            this.props.fetchRandomProducts(40);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        let components = {
            'featured': this.featuredProduct(),
            'products': this.productList(),
            'recommended': this.recommended()
        }
        let areas = ['featured', 'products', 'recommended']
        return <GridLayout areas={areas} components={components}
                                classGrid="product-template-grid"
                                classElements="product-template-items"
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTemplate);