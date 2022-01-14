import React from 'react';
import {connect} from "react-redux";
import "./favorites_page.css"
import SelectionsFull from "../themes/selections_full/selections_full";
import CardFeatured from "../user_controls/card_featured/card_featured";
import GridLayout from "../user_controls/grid_layout/grid_layout";
import SelectionsCircular from "../themes/selections_circular/selections_circular";
import {fetchFavorites} from "../../actions/favorite_action";


const mapStateToProps = ({entities, errors, index, session}, ownProps) => {
    let productIds = !session.id && [] || [...entities.favorites];

    return {
        user_id: session.id,
        featuredId: productIds && productIds[0] || null,
        productIds: productIds && productIds.slice(1, 31) || null,
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

    isRenderValid() {
        return this.props.productIds.length && !!this.props.user_id
    }

    resolve() {
        if (!this.props.productIds) {
            this.props.fetchFavorites(this.props.user_id);
        }
        return null;
    }

    render() {
        if (!this.isRenderValid())
            return this.resolve();


        let components = {
            'featured': <CardFeatured productId={this.props.featuredId}/>,
            'products': <SelectionsFull productIds={this.props.productIds} numCols={5}/>,
            'recommended': <SelectionsCircular productIds={this.props.recommendationIds}/>
        }
        let areas = ['featured', 'products', 'recommended']
        return <div className="favorites-page-div">
            <GridLayout areas={areas} components={components}
                        className="favorites-page-grid"
                        classElements="favorites-page-items"
            /></div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);