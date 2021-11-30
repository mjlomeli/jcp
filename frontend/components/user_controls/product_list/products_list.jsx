import {connect} from 'react-redux';
import React from 'react';
import './products_list.css';
import GridLayout from "../grid_layout/grid_layout";
import FlowLayout from "../flow_layout/flow_layout";
import CardListing from "../card_listing/card_listing";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

const defaultComponents = Array(17).fill(<CardListing />);

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {components: props.components || defaultComponents, maxColumns: props.maxColumns || 4}

        this.classGrid = `global-products-list-grid ${props.className || props.classGrid || ""}`;
        this.classItem = `global-products-list-items ${props.className || props.classItems || ""}`;
    }


    render() {

        return <FlowLayout components={this.state.components} maxColumns={this.state.maxColumns}
                           classGrid={this.classGrid} classItems={this.classItem}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);