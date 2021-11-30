import {connect} from 'react-redux';
import React from 'react';
import './viewlayout.css'
import GridLayout from "../grid_layout/grid_layout";
import CardListing from "../card_listing/card_listing";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "view_layout"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class ViewLayout extends React.Component {
    constructor(props) {
        super(props);

        if (props.areas && props.components) {
            this.classGrid = `global-viewlayout-grid ${props.gridClass || ""}`;
            this.classItems = `global-viewlayout-items ${props.itemClass || ""}`;
        } else {
            this.classGrid = `global-viewlayout-grid global-default-viewlayout-grid`;
            this.classItems = `global-viewlayout-items global-default-viewlayout-items`;
        }
    }

    render() {
        return <div className="global-viewlayout-grid">
            <CardListing />
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewLayout);