import {connect} from 'react-redux';
import React from 'react';
import './home_body_template.css'
import './circular_thumbnail.css'
import CardThumbnail from "../../user_controls/card_thumbnail/card_thumbnail";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import CardListing from "../../user_controls/card_listing/card_listing";
import CircularThumbnail from "../../user_controls/circular_thumbnail/circular_thumbnail";
import {fetchRandomProducts} from "../../../actions/product_action";
import {Product} from "../../../lib/product";
import {Image} from "../../../lib/image";


const mapStateToProps = ({entities, errors}) => {
    let productIds = Object.keys(entities.products);
    return {
        productIds: productIds,
        categories: productIds.slice(0, 6),
        popular: productIds.slice(0, 5),
        recent: productIds.slice(0, 10),
        firstPicks: productIds.slice(0, 6),
        secondPicks: productIds.slice(0, 10),
        firstActivity: productIds.slice(0, 9),
        secondActivity: productIds.slice(0, 5),
        editors: productIds.slice(0, 6),
        selections: productIds.slice(0, 8),
        productsList: productIds.slice(0, 16 * 4),
        recommendations: productIds.slice(0, 6)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
});

class HomeBodyTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    categories1x6() {
        let layout1x6 = [];
        let components = {};
        this.props.categories.forEach((productId, idx) => {
            layout1x6.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CircularThumbnail productId={productId}
                                                           product={Product.findById(productId)}
                                                           images={Image.findByProductId(productId)}
                                                           className="thumbnail"
                                                           classTitle="thumbnail-title"
                                                           classImage="thumbnail-image"
                                                           classElements="thumbnail-elements"
                                                           classHover="thumbnail-hover"
                                                           classTitleHover="thumbnail-title-hover"
                                                           classImageHover="thumbnail-image-hover"/>
        });
        return <GridLayout areas={[layout1x6.join(" ")]}
                           components={components}
                           className="categories-grid"
                           classElements="categories-items"/>
    }

    popular() {
        let text = <div>
            <h2 className="home-body-thumbnail-titles">Popular gifts right now</h2>
        </div>
        let layout = ['text text text text text'];
        let indices = [];
        let components = {
            'text': text
        }
        this.props.popular.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CardListing length={20}
                                                     productId={productId}
                                                     product={Product.findById(productId)}
                                                     images={Image.findByProductId(productId)}/>
        })
        layout.push(indices.join(" "))
        return <GridLayout areas={layout}
                           components={components}
                           className="popular-grid"
                           classElements="popular-items"/>
    }

    recentlyViewed() {
        let layout2x5 = [];
        let components = {}
        let indices = []
        this.props.recent.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === this.props.recent.length / 2) {
                layout2x5.push(indices.join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        return <>
            <p className="home-body-text">Recently viewed & more</p>
            <GridLayout areas={layout2x5} components={components} className="recently-viewed-grid"
                        classElements="recently-viewed-items"/>
        </>
    }

    picksForYou1x6() {
        let layout1x6 = [];
        let components = {}
        this.props.firstPicks.forEach((productId, idx) => {
            layout1x6.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CircularThumbnail productId={productId}
                                                           product={Product.findById(productId)}
                                                           images={Image.findByProductId(productId)}
                                                           className="thumbnail"
                                                           classTitle="thumbnail-title"
                                                           classImage="thumbnail-image"
                                                           classElements="thumbnail-elements"
                                                           classHover="thumbnail-hover"
                                                           classTitleHover="thumbnail-title-hover"
                                                           classImageHover="thumbnail-image-hover"/>
        });
        return <>
            <h2 className="home-body-sub-title">Our Picks For You</h2>
            <GridLayout areas={[layout1x6.join(" ")]} components={components} className="picks-circle-grid"
                        classElements="picks-circle-items"/>
        </>
    }

    picksForYou2x5() {
        let layout = [];
        let components = {}
        let indices = [];
        this.props.secondPicks.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === this.props.secondPicks.length / 2) {
                layout.push(indices.join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        return <GridLayout areas={layout} components={components} className="picks-square-grid"
                           classElements="picks-square-items"/>
    }

    based_activity_large() {
        let layout = [];
        let mainId = this.props.firstActivity[0];
        let components = {
            "main": <CardThumbnail productId={mainId} product={Product.findById(mainId)}
                                   images={Image.findByProductId(mainId)}/>
        };
        let indices = [];
        this.props.firstActivity.slice(1).forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === Math.floor(this.props.firstActivity.length / 2)) {
                layout.push(["main", "main"].concat(indices).join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        return <>
            <h2 className="home-body-thumbnail-titles">Selections →</h2>
            <label className="home-body-descriptions">Based on your activity</label>
            <GridLayout areas={layout} components={components} className="based-activity-grid"
                        classElements="based-activity-large-items"/>
        </>
    }

    based_activity_small() {
        let layout = [];
        let components = {}
        this.props.secondActivity.forEach((productId, idx) => {
            layout.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })

        return <>
            <h2 className="home-body-thumbnail-titles">Selections →</h2>
            <label className="home-body-descriptions">Based on your activity</label>
            <GridLayout areas={[layout.join(" ")]} components={components} className="based-activity-grid"
                        classElements="based-activity-small-items"/>
        </>
    }

    editorsPicks() {
        let layout = [];
        let text = <div>
            <p className="home-body-text">Editors' Picks</p>
            <h2 className="home-body-thumbnail-titles">Creating change together</h2>
        </div>
        let components = {'text': text}
        let indices = ['text', 'text'];
        this.props.editors.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === Math.floor((this.props.editors.length + 2) / 2)) {
                layout.push(indices.join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardThumbnail productId={productId}
                                                       product={Product.findById(productId)}
                                                       images={Image.findByProductId(productId)}/>
        })
        return <GridLayout areas={layout} components={components} className="editors-picks-grid"
                           classElements="editors-picks-items"/>
    }

    selections() {
        let layout = ['text text text text'];
        let text = <div>
            <h2 className="home-body-thumbnail-titles">Shop our selections</h2>
            <label className="home-body-descriptions">Curated collections hand-picked by JCP editors</label>
        </div>
        let components = {'text': text}
        let indices = [];
        this.props.selections.forEach((productId, idx) => {
            indices.push(`comp_${idx}`)
            if (indices.length === Math.floor(this.props.selections.length / 2)) {
                layout.push(indices.join(" "))
                indices = [];
            }
            components[`comp_${idx}`] = <CardListing length={50} productId={productId}
                                                     product={Product.findById(productId)}
                                                     images={Image.findByProductId(productId)}/>
        })
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

    recommendations() {
        let layout1x6 = ['one two three four five six'];
        let components = {}
        this.props.recommendations.forEach((productId, idx) => {
            layout1x6.push(`comp_${idx}`)
            components[`comp_${idx}`] = <CircularThumbnail productId={productId}
                                                           product={Product.findById(productId)}
                                                           images={Image.findByProductId(productId)}
                                                           className="thumbnail"
                                                           classTitle="thumbnail-title"
                                                           classImage="thumbnail-image"
                                                           classElements="thumbnail-elements"
                                                           classHover="thumbnail-hover"
                                                           classTitleHover="thumbnail-title-hover"
                                                           classImageHover="thumbnail-image-hover"/>
        })
        return <div className="recommendation-footer">
            <svg className="background-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16174.827 5113.078">
                <path fill="#FDEBD2"
                      d="M16174.824,2095.349l0.002-2071.026l-279.715,121.615l-279.715,48.646l-72.969-12.162l-109.455,12.162 l-60.808,24.323l-291.876,97.292h-133.777l-218.906-60.808l-133.776-12.162l-121.615-12.161h-85.131l-97.292,36.485l-97.293,12.161 l-170.262-48.646v12.162l-36.484,12.162l-109.453-60.808l-36.484-12.162l-206.746,24.323l-121.615-12.162L13402,182.421 l-97.293,12.162l-85.131,12.162l-24.321,12.161h-158.101l-24.324-12.161l-158.1-24.323h-243.23l-133.775,24.323l-170.262,36.484 h-218.908l-121.615,12.162l-36.483-12.162l-24.324-12.162l-48.646-12.162h-48.646l-194.585,12.162h-24.323l-85.131-12.162h-72.969 l-97.292,12.162l-72.97-24.323l-60.808-12.162l-24.323,12.162l-243.23-12.162l-121.615,24.323h-72.969l-133.775-12.161 l-109.455-12.162h-48.646l-36.483,12.162l-231.068,12.161h-231.069l-36.483-12.161l-133.776,12.161h-24.323l-85.131,36.485h-279.715 l-36.484,12.162h-231.068l-194.584-12.162l-206.75,12.163h-97.292l-24.323-12.162l-243.23-24.323l-48.646,12.162l-48.646-12.162 h-24.322l-145.938,12.162l-24.323,12.162h-158.1l-109.454,12.161h-48.646l-72.969-12.162l-121.615,12.162l-109.454-12.162H7260.43 l-109.453,24.323l-145.938-24.323L6859.1,231.067l-36.483,24.323l-60.808,24.323l-133.777-36.484l-72.969,12.162h-72.969 l-340.522,12.162l-60.808,24.323h-401.332l-36.483,12.162l-48.646,24.323h-206.746l-60.809,12.161l-48.646-12.161l-85.131-12.162 h-60.808l-48.646,12.162l-158.1,36.484l-24.323-24.323l-24.323-12.161h-182.423L4426.794,316.2h-24.323l-133.775,12.162h-60.809 l-24.323-12.162h-231.069l-109.453,12.162l-72.97-12.162h-24.323l-109.453,24.323l-182.424,24.323h-48.646l-145.938,12.162H2955.25 l-145.938,12.162l-85.131,12.161h-48.646l-48.646,12.162h-48.646l-48.646,12.162h-243.229l-36.484-12.162h-85.131l-12.162-12.162 v-48.646l-12.162,12.162h-24.323l-109.453,12.162l-24.323,24.323l-72.969,24.323l-85.131,12.162l-60.808,24.323h-24.323 l-36.484-24.323l-97.293-12.162h-48.646l-133.776,36.484h-12.162l-36.484-24.323l-133.777-36.485l-243.229-72.969l-109.454-36.484 h-36.484L741.852,316.2h-60.808l-133.776-48.646l-158.1-36.485L255.391,48.646L-0.001,0L0,5113.077h16174.826L16174.824,2095.349z"/>
            </svg>
            <h2 className="home-body-thumbnail-titles">Explore related</h2>
            <GridLayout areas={[layout1x6.join(" ")]} components={components} className="recommendations-grid"
                        classElements="recommendations-items"/>
        </div>
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
        let areas = ["categories", "popular", "viewed", "picks1", "picks2", "editors", "selections", "based_1", "based_2", "recommendations"]
        let components = {
            "categories": this.categories1x6(),
            "popular": this.popular(),
            "viewed": this.recentlyViewed(),
            "picks1": this.picksForYou1x6(),
            "picks2": this.picksForYou2x5(),
            "editors": this.editorsPicks(),
            "based_1": this.based_activity_large(),
            "based_2": this.based_activity_small(),
            "selections": this.selections(),
            "recommendations": this.recommendations()
        }
        return <>
            <div className="background-header"/>
            <h1 className="home-body-title">{"Enjoy Cyber Week deals on small"}</h1>
            <h1 className="home-body-title">{"business cheer!"}</h1>
            <GridLayout areas={areas} components={components} className="body-template-grid"/>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBodyTemplate);