import React from 'react';
import './home_page.css'
import {fetchProducts, fetchProductsTitles, fetchRandomProducts} from "../../actions/product_action";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import SelectionsFull from "../themes/selections_full/selections_full";
import SelectionsThumbnails from "../themes/selections_thumbnails/selections_thumbnails";
import {connect} from "react-redux";
import SelectionsLarge from "../themes/selections_large/selections_large";
import SelectionsSmall from "../themes/selections_small/selections_small";
import SelectionsBordered from "../themes/selections_bordered/selections_bordered";
import GridLayout from "../user_controls/grid_layout/grid_layout";


const mapStateToProps = ({entities, session, index, errors}, ownProps) => {
    let shopListings = Object.keys(entities.products);
    let isLoggedIn = !!session.id;
    let firstName = isLoggedIn && entities.user.first_name;
    return {
        query: index.query,
        isLoggedIn: isLoggedIn,
        firstName: firstName,
        productIds: shopListings,
        categories: shopListings.slice(0, 6),
        popular: shopListings.slice(6, 11),
        recent: shopListings.slice(11, 21),
        firstPicks: shopListings.slice(21, 27),
        secondPicks: shopListings.slice(27, 37),
        firstActivity: shopListings.slice(37, 46),
        secondActivity: shopListings.slice(46, 52),
        editors: shopListings.slice(52, 58),
        selections: shopListings.slice(58, 66),
        recommendations: shopListings.slice(66, 72)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchRandomProducts: (n) => dispatch(fetchRandomProducts(n)),
    fetchProducts: query => dispatch(fetchProducts(query)),
    fetchProductsTitles: () => dispatch(fetchProductsTitles())
});


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.props.productIds.length;
    }

    isRenderValid() {
        return this.props.productIds && this.props.productIds.length;
    }

    resolve() {
        if (!this.props.productIds || this.props.productIds.length === 0)
            this.props.fetchRandomProducts(72);
        return null;
    }

    postFetch(){
        Promise.resolve().then(_ => {
            this.props.fetchProducts({taxonomy_paths: ["Art & Collectibles"]});
            this.props.fetchProducts({taxonomy_paths: ["Craft Supplies & Tools"]});
            this.props.fetchProducts({taxonomy_paths: ["Books, Movies & Music"]});
            this.props.fetchProducts({taxonomy_paths: ["Home & Living"]});
            this.props.fetchProducts({taxonomy_paths: ["Home Decor"]});
            this.props.fetchProducts({taxonomy_paths: ["Jewelry"]});
            this.props.fetchProducts({taxonomy_paths: ["Toys & Games"]});
            this.props.fetchProducts({taxonomy_paths: ["Kitchen & Dining"]});
            this.props.fetchProducts({taxonomy_paths: ["Drink & Barware"]});
            this.props.fetchProductsTitles();
        })
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        this.postFetch()
        let areas = ["categories", "popular", "viewed", "picks1", "picks2", "editors", "selections", "based_1", "based_2", "recommendations"]
        let components = {
            "categories": <SelectionsCircular productIds={this.props.categories}/>,

            "popular": <SelectionsFull productIds={this.props.popular} numRows={1} title={"Popular gifts right now"}/>,

            "viewed": <SelectionsThumbnails productIds={this.props.recent} numRows={2} title={"Recently viewed & more"}/>,

            "picks1": <><h2 className="home-page-sub-title">Our Picks For You</h2>
                <SelectionsCircular productIds={this.props.firstPicks} />
            </>,

            "picks2":  <SelectionsThumbnails productIds={this.props.secondPicks} numRows={2} />,

            "editors": <SelectionsLarge
                mainId={this.props.firstActivity[0]}
                productIds={this.props.firstActivity.slice(1)}
                title={"Selections →"}
                description={"Based on your activity"}/>,

            "based_1": <SelectionsSmall productIds={this.props.secondActivity} title={"Selections →"} description={"Based on your activity"} />,

            "based_2": <SelectionsBordered title={"Editors' Picks"} description={"Creating change together"}
                                productIds={this.props.editors}/>,

            "selections": <SelectionsFull productIds={this.props.selections}
                            numRows={2}
                            title={"Shop our selections"}
                            description={"Curated collections hand-picked by JCP editors"}/>,

            "recommendations": <div className="recommendation-footer">
                <svg className="background-footer" xmlns="http://www.w3.org/2000/svg" height="300" viewBox="0 0 16174.827 5113.078" preserveAspectRatio="none">
                    <path fill="#FDEBD2" d="M16174.824,2095.349l0.002-2071.026l-279.715,121.615l-279.715,48.646l-72.969-12.162l-109.455,12.162 l-60.808,24.323l-291.876,97.292h-133.777l-218.906-60.808l-133.776-12.162l-121.615-12.161h-85.131l-97.292,36.485l-97.293,12.161 l-170.262-48.646v12.162l-36.484,12.162l-109.453-60.808l-36.484-12.162l-206.746,24.323l-121.615-12.162L13402,182.421 l-97.293,12.162l-85.131,12.162l-24.321,12.161h-158.101l-24.324-12.161l-158.1-24.323h-243.23l-133.775,24.323l-170.262,36.484 h-218.908l-121.615,12.162l-36.483-12.162l-24.324-12.162l-48.646-12.162h-48.646l-194.585,12.162h-24.323l-85.131-12.162h-72.969 l-97.292,12.162l-72.97-24.323l-60.808-12.162l-24.323,12.162l-243.23-12.162l-121.615,24.323h-72.969l-133.775-12.161 l-109.455-12.162h-48.646l-36.483,12.162l-231.068,12.161h-231.069l-36.483-12.161l-133.776,12.161h-24.323l-85.131,36.485h-279.715 l-36.484,12.162h-231.068l-194.584-12.162l-206.75,12.163h-97.292l-24.323-12.162l-243.23-24.323l-48.646,12.162l-48.646-12.162 h-24.322l-145.938,12.162l-24.323,12.162h-158.1l-109.454,12.161h-48.646l-72.969-12.162l-121.615,12.162l-109.454-12.162H7260.43 l-109.453,24.323l-145.938-24.323L6859.1,231.067l-36.483,24.323l-60.808,24.323l-133.777-36.484l-72.969,12.162h-72.969 l-340.522,12.162l-60.808,24.323h-401.332l-36.483,12.162l-48.646,24.323h-206.746l-60.809,12.161l-48.646-12.161l-85.131-12.162 h-60.808l-48.646,12.162l-158.1,36.484l-24.323-24.323l-24.323-12.161h-182.423L4426.794,316.2h-24.323l-133.775,12.162h-60.809 l-24.323-12.162h-231.069l-109.453,12.162l-72.97-12.162h-24.323l-109.453,24.323l-182.424,24.323h-48.646l-145.938,12.162H2955.25 l-145.938,12.162l-85.131,12.161h-48.646l-48.646,12.162h-48.646l-48.646,12.162h-243.229l-36.484-12.162h-85.131l-12.162-12.162 v-48.646l-12.162,12.162h-24.323l-109.453,12.162l-24.323,24.323l-72.969,24.323l-85.131,12.162l-60.808,24.323h-24.323 l-36.484-24.323l-97.293-12.162h-48.646l-133.776,36.484h-12.162l-36.484-24.323l-133.777-36.485l-243.229-72.969l-109.454-36.484 h-36.484L741.852,316.2h-60.808l-133.776-48.646l-158.1-36.485L255.391,48.646L-0.001,0L0,5113.077h16174.826L16174.824,2095.349z"/>
                </svg>
                <SelectionsCircular productIds={this.props.recommendations} title="Explore related"/>
            </div>
        }

        let message = this.props.isLoggedIn ? <>
            <h1 className="home-page-title">Welcome back,</h1>
            <h1 className="home-page-title">{this.props.firstName}!</h1>
        </>: <>
                <h1 className="home-page-title">Enjoy Cyber Week deals on small</h1>
                <h1 className="home-page-title">business cheer!</h1></>
        return <><div className="background-header"/>
            <div style={{width: "100%"}}>
            {message}
            <GridLayout areas={areas} components={components} className="home-page-grid"/>
        </div></>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);