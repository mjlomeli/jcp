import {connect} from 'react-redux';
import React from 'react';
import './products_template.css'
import CardListing from "../../user_controls/card_listing/card_listing";
import CardFeatured from "../../user_controls/card_featured/card_featured";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CircularThumbnail from "../../user_controls/circular_thumbnail/circular_thumbnail";


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
        let layout5x4 = [];
        let components = {};
        let thumbnail = <CardListing />
        let idx = 0;
        for (let i = 0; i < Math.ceil(this.state.perPage / 4); i++){
            let s = [];
            for (let j = 0; j < 4; j++) {
                let comp = `item${idx + 1}`
                s.push(comp);
                components[comp] = thumbnail;
                idx++;
            }
            layout5x4.push(s.join(" "));
        }
        return <GridLayout areas={layout5x4} components={components} gridClass="product-feature-list-grid" itemClass="product-feature-list-items"/>
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
        return <GridLayout areas={layout1x4} components={components} gridClass="product-feature-rec-grid" itemClass="product-feature-rec-items"/>
    }

    render() {
        let components = {
            'featured': this.featuredProduct(),
            'products': this.productList(),
            'recommended': this.recommended()
        }
        let areas = ['featured', 'products', 'recommended']
        return <>
            <div className="background">
                <div className="home-module">
                    <GridLayout areas={areas} components={components} gridClass="product-template-grid"/>
                </div>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTemplate);