import React from 'react';
import {connect} from "react-redux";
import "./favorites_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import {fetchFavorites} from "../../actions/favorite_action";
import {Link} from "react-router-dom";


const mapStateToProps = ({entities, errors, index, session}, ownProps) => {
    let favoriteIds = [...entities.favorites];
    let productIds = Object.keys(entities.products);
    let recommendationIds = productIds.slice(0,6);
    return {
        userId: session.id,
        favoriteIds: favoriteIds,
        recommendationIds: recommendationIds
    }
};

const mapDispatchToProps = dispatch => ({
    fetchFavorites: (userId) => dispatch(fetchFavorites(userId))
});

class FavoritesPage extends React.Component {
    constructor(props) {
        super(props);
    }

    emptyFavorites(){
        return <div className="favorites-empty">
            <h2 className="favorites-title">Your favorites is empty.</h2>
            <Link to="/home">Discover something unique.</Link>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //Must include this to prevent re-rendering in chaotic intervals
        let preProductIds = this.props.productIds;
        let postProductIds = nextProps.productIds;
        if (!preProductIds || !postProductIds)
            return true;
        if (preProductIds.length !== postProductIds.length)
            return true;
        else if (!postProductIds.every((postId) => preProductIds.includes(postId)))
            return true;
        return false;
    }

    isRenderValid() {
        return this.props.favoriteIds.length && !!this.props.userId
    }

    resolve() {
        if (!this.props.favoriteIds)
            this.props.fetchFavorites(this.props.userId);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        else if (!this.props.favoriteIds.length)
            return this.emptyFavorites();


        let components = {
            'products': <SelectionsFull productIds={this.props.favoriteIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds}/>
        }
        let areas = ['products', 'recommended']
        return <div className="favorites-page-div">
            <GridLayout key={this.props.favoriteIds.toString()} areas={areas} components={components}
                        className="favorites-page-grid"
                        classElements="favorites-page-items"
            /></div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);