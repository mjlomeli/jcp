import {connect} from 'react-redux';
import React from 'react';
import './body_template.css'
import CardThumbnail from "../../user_controls/card_thumbnail/card_thumbnail";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CardListing from "../../user_controls/card_listing/card_listing";
import CircularThumbnail from "../../user_controls/circular_thumbnail/circular_thumbnail";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class BodyTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Enjoy Cyber Week deals on small business cheer!",
            layout: props.layout
        }
    }

    recentlyViewed(){
        let layout2x5 = ['one two three four five', 'six seven eight nine ten'];
        let thumbnail = <CardThumbnail />
        let components = {'one': thumbnail, 'two': thumbnail, 'three': thumbnail, 'four': thumbnail,
            'five': thumbnail, 'six': thumbnail, 'seven': thumbnail, 'eight': thumbnail, 'nine': thumbnail, 'ten': thumbnail
        }
        return <GridLayout areas={layout2x5} components={components} gridClass="recently-viewed-grid" itemClass="recently-viewed-items"/>
    }

    picksForYou() {
        let layout1x6 = ['one two three four five six'];
        let thumbnail = <CircularThumbnail/>
        let components = {
            'one': thumbnail, 'two': thumbnail, 'three': thumbnail, 'four': thumbnail,
            'five': thumbnail, 'six': thumbnail
        }
        return <GridLayout areas={layout1x6} components={components} gridClass="picks-for-you-grid"
                           itemClass="picks-for-you-items"/>
    }


    productList(){
        let layout16x4 = [];
        let components = {};
        let thumbnail = <CardListing />
        let idx = 0;
        for (let i = 0; i < 16; i++){
            let s = [];
            for (let j = 0; j < 4; j++) {
                let comp = `item${idx + 1}`
                s.push(comp);
                components[comp] = thumbnail;
                idx++;
            }
            layout16x4.push(s.join(" "));
        }
        return <GridLayout areas={layout16x4} components={components} gridClass="product-list-grid" itemClass="product-list-items"/>
    }

    render() {
        return <>
            <div className="background">
                <div className="message"><h1 className="message-text">{this.state.message}</h1></div>
                <div className="home-module">
                    {this.recentlyViewed()}
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    {this.picksForYou()}
                    <br /><br /><br /><br /><br /><br /><br /><br />
                    {this.productList()}
                </div>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyTemplate);