import {connect} from 'react-redux';
import React from 'react';
import './products_template.css'
import CardListing from "../../user_controls/card_listing/card_listing";
import CardFeatured from "../../user_controls/card_featured/card_featured";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CircularThumbnail from "../../user_controls/circular_thumbnail/circular_thumbnail";
import ProductsList from "../../user_controls/product_list/products_list";


const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class ProductsTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, lastPage: 99, perPage: 20}
    }

    featuredProduct() {
        return <CardFeatured />
    }


    productList(){
        return <div className="product-template-productlist"><ProductsList /></div>
    }

    recommended(){
        let layout1x4 = ['rec1 rec2 rec3 rec4'];
        let thumbnail = <CircularThumbnail />
        let components = {
            'rec1': thumbnail,
            'rec2': thumbnail,
            'rec3': thumbnail,
            'rec4': thumbnail
        };
        return <GridLayout areas={layout1x4} components={components}
                           classGrid="product-template-rec-grid" classItems="product-template-rec-items"/>
    }

    render() {
        let components = {
            'featured': this.featuredProduct(),
            'products': this.productList(),
            'recommended': this.recommended()
        }
        let areas = ['featured', 'products', 'recommended']
        return <GridLayout areas={areas} components={components}
                                classGrid="product-template-grid"
                                classItems="product-template-items"
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTemplate);