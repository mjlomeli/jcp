import {connect} from 'react-redux';
import React from 'react';
import './home_body_template.css'
import './circular_thumbnail.css'
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

class HomeBodyTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.header || "Enjoy Cyber Week deals on small business cheer!",
            layout: props.layout
        }
    }

    categories1x6() {
        let layout1x6 = ['one two three four five six'];
        let thumbnail = <CircularThumbnail className="thumbnail"
                                           classTitle="thumbnail-title"
                                           classImage="thumbnail-image"
                                           classElements="thumbnail-elements"
                                           classHover="thumbnail-hover"
                                           classTitleHover="thumbnail-title-hover"
                                           classImageHover="thumbnail-image-hover"/>
        let components = {
            'one': thumbnail, 'two': thumbnail, 'three': thumbnail, 'four': thumbnail,
            'five': thumbnail, 'six': thumbnail
        }
        return <GridLayout areas={layout1x6} components={components} className="categories-grid"
                           classElements="categories-items"/>
    }

    recentlyViewed() {
        let layout2x5 = ['one two three four five', 'six seven eight nine ten'];
        let thumbnail = <CardThumbnail/>
        let components = {
            'one': thumbnail,
            'two': thumbnail,
            'three': thumbnail,
            'four': thumbnail,
            'five': thumbnail,
            'six': thumbnail,
            'seven': thumbnail,
            'eight': thumbnail,
            'nine': thumbnail,
            'ten': thumbnail
        }
        return <>
            <p className="home-body-text">Recently viewed & more</p>
            <GridLayout areas={layout2x5} components={components} className="recently-viewed-grid"
                        classElements="recently-viewed-items"/>
        </>
    }

    picksForYou1x6() {
        let layout1x6 = ['one two three four five six'];
        let thumbnail = <CircularThumbnail className="thumbnail"
                                           classTitle="thumbnail-title"
                                           classImage="thumbnail-image"
                                           classElements="thumbnail-elements"
                                           classHover="thumbnail-hover"
                                           classTitleHover="thumbnail-title-hover"
                                           classImageHover="thumbnail-image-hover"/>
        let components = {
            'one': thumbnail, 'two': thumbnail, 'three': thumbnail, 'four': thumbnail,
            'five': thumbnail, 'six': thumbnail
        }
        return <>
            <h2 className="home-body-sub-title">Our Picks For You</h2>
            <GridLayout areas={layout1x6} components={components} className="picks-circle-grid"
                        classElements="picks-circle-items"/>
        </>
    }

    picksForYou2x4() {
        let layout = ['one two three four', 'five six seven eight'];
        let thumbnail = <CardThumbnail/>
        let components = {
            'one': thumbnail, 'two': thumbnail, 'three': thumbnail, 'four': thumbnail,
            'five': thumbnail, 'six': thumbnail, 'seven': thumbnail, 'eight': thumbnail
        }
        return <GridLayout areas={layout} components={components} className="picks-square-grid"
                           classElements="picks-square-items"/>
    }

    based_activity_large() {
        let layout = ['main main one two three four', 'main main five six seven eight'];
        let thumbnail = <CardThumbnail/>
        let components = {
            'main': thumbnail, 'one': thumbnail, 'two': thumbnail, 'three': thumbnail,
            'four': thumbnail, 'five': thumbnail, 'six': thumbnail, 'seven': thumbnail, 'eight': thumbnail
        }
        return <>
            <h2 className="home-body-thumbnail-titles">Selections →</h2>
            <label className="home-body-descriptions">Based on your activity</label>
            <GridLayout areas={layout} components={components} className="based-activity-grid"
                           classElements="based-activity-large-items"/>
            </>
    }

    based_activity_small() {
        let layout = ['one two three four five'];
        let thumbnail = <CardThumbnail/>
        let components = {
            'one': thumbnail, 'two': thumbnail, 'three': thumbnail, 'four': thumbnail, 'five': thumbnail
        }
        return <>
            <h2 className="home-body-thumbnail-titles">Selections →</h2>
            <label className="home-body-descriptions">Based on your activity</label>
            <GridLayout areas={layout} components={components} className="based-activity-grid"
                        classElements="based-activity-small-items"/>
        </>
    }

    editorsPicks() {
        let layout = ['text text one two', 'three four five six'];
        let thumbnail = <CardThumbnail/>
        let text = <div>
            <p className="home-body-text">Editors' Picks</p>
            <h2 className="home-body-thumbnail-titles">Creating change together</h2>
        </div>
        let components = {
            'text': text, 'one': thumbnail, 'two': thumbnail, 'three': thumbnail,
            'four': thumbnail, 'five': thumbnail, 'six': thumbnail
        }
        return <GridLayout areas={layout} components={components} className="editors-picks-grid"
                        classElements="editors-picks-items"/>
    }

    selections() {
        let layout = ['text text text', 'one two three', 'four five six'];
        let thumbnail = <CardListing />
        let text = <div>
            <h2 className="home-body-thumbnail-titles">Shop our selections</h2>
            <label className="home-body-descriptions">Curated collections hand-picked by JCP editors</label>
        </div>
        let components = {
            'text': text, 'one': thumbnail, 'two': thumbnail, 'three': thumbnail,
            'four': thumbnail, 'five': thumbnail, 'six': thumbnail
        }
        return <GridLayout areas={layout} components={components} className="shop-selections-grid"
                           classElements="shop-selections-items"/>
    }

    productList() {
        let layout16x4 = [];
        let components = {};
        let thumbnail = <CardListing/>
        let idx = 0;
        for (let i = 0; i < 16; i++) {
            let s = [];
            for (let j = 0; j < 4; j++) {
                let comp = `item${idx + 1}`
                s.push(comp);
                components[comp] = thumbnail;
                idx++;
            }
            layout16x4.push(s.join(" "));
        }
        return <GridLayout areas={layout16x4} components={components} className="product-list-grid"
                           classElements="product-list-items"/>
    }

    render() {
        let areas = ["categories", "viewed", "picks1", "picks2", "editors", "selections", "based_1", "based_2"]
        let components = {
            "categories": this.categories1x6(),
            "viewed": this.recentlyViewed(),
            "picks1": this.picksForYou1x6(),
            "picks2": this.picksForYou2x4(),
            "editors": this.editorsPicks(),
            "based_1": this.based_activity_large(),
            "based_2": this.based_activity_small(),
            "selections": this.selections()
        }
        return <>
            <div className="background"/>
            <h1 className="home-body-title">{this.state.message}</h1>
            <GridLayout areas={areas} components={components} className="body-template-grid"/>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBodyTemplate);