import React from 'react';
import {connect} from "react-redux";
import "./favorites_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import CardFeatured from "../user_controls/card_featured/card_featured";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import {fetchFavorites} from "../../actions/favorite_action";
import {Link} from "react-router-dom";


const mapStateToProps = ({entities, errors, index, session}, ownProps) => {
    let productIds = !session.id && [] || [...entities.favorites];

    return {
        user_id: session.id,
        productIds: productIds && productIds.slice(0, 30) || null,
        recommendationIds: Object.keys(entities.products).slice(0,6) || []
    }
};

const mapDispatchToProps = dispatch => ({
    fetchFavorites: (user_id) => dispatch(fetchFavorites(user_id))
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

    isRenderValid() {
        return this.props.productIds && !!this.props.user_id
    }

    resolve() {
        if (!this.props.productIds)
            this.props.fetchFavorites(this.props.user_id);
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();
        else if (!this.props.productIds.length)
            return this.emptyFavorites();


        let components = {
            'products': <SelectionsFull productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds}/>
        }
        let areas = ['products', 'recommended']
        return <div className="favorites-page-div">
            <GridLayout areas={areas} components={components}
                        className="favorites-page-grid"
                        classElements="favorites-page-items"
            /></div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);