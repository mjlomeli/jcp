import React from 'react';
import './grid_layout.css'
import {v4 as uuidv4} from "uuid";
import {fetchUserControl, updateUserControl} from "../../../actions/ui_user_control_actions";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
    let userControl = state.ui.userControl.gridLayout;
    let gridLayoutId = (ownProps.match && ownProps.match.params.id) || ownProps.gridLayoutId;
    let gridLayout = (gridLayoutId && userControl[gridLayoutId]) || null;
    let component = gridLayout && gridLayout.component || null;
    let areas = gridLayout && gridLayout.areas || null;
    let components = gridLayout && gridLayout.components || null;

    return {
        //errors: errors.session, // need to add a ui or user_control errors
        gridLayoutId: gridLayoutId,
        gridLayout: gridLayout,
        component: component,
        reducer: "gridLayout",
        areas: areas,
        components: components
    }
};

const mapDispatchToProps = (dispatch, ownProp) => {
    return {
        fetchUserControl: (reducer, id) => dispatch(fetchUserControl(reducer, id)),
        updateUserControl: (reducer, id, ui) => dispatch(updateUserControl(reducer, id, ui))
    }
};

let defaultGrid = () => {
    let layout4x5 = [];
    let components = {};
    let idx = 0;
    for (let i = 0; i < 5; i++) {
        let s = [];
        for (let j = 0; j < 4; j++) {
            let comp = `item${idx + 1}`
            s.push(comp);
            components[comp] = <label>Row_{i}, Col_{j}</label>;
            idx++;
        }
        layout4x5.push(s.join(" "));
    }
    return [layout4x5, components]
}

let [defaultArea, defaultComponents] = defaultGrid();
let defaultClassGrid = `global-gridlayout-grid global-default-gridlayout-grid`;
let defaultClassItems = `global-gridlayout-items global-default-gridlayout-items`;


class GridLayout extends React.Component {
    static REDUCER = "gridLayout";

    constructor(props) {
        super(props);
        this.state = {areas: props.areas || defaultArea, components: props.components || defaultComponents}
        this.id = this.props.gridLayoutId || this.props.match && this.props.match.params.id;

        this.classGrid = this.props.areas && `global-gridlayout-grid ${props.classGrid || ""}` || defaultClassGrid;
        this.classItems = this.props.components && `global-gridlayout-items ${props.classItems || ""}` || defaultClassItems;

        this.onmouseenter = props.onMouseEnter;
        this.onmouseleave = props.onMouseLeave;
        this.onclick = props.onClick;
        this.onload = props.onLoad;
    }

    componentDidMount() {
    }

    isValid(){
        let userControl = this.id && this.props.fetchUserControl(GridLayout.REDUCER, this.id)
        return this.props.component || userControl && userControl.component || false;
    }

    resolve(){
        let areas = this.state.areas.map(r => `'${r}'`)
        let style = {gridTemplateAreas: areas.join(' ')}
        let components = Object.entries(this.state.components).map(
            (obj, i) => {
                let [key, value] = obj;
                return <div key={uuidv4()} className={this.classItems} style={{gridArea: `${key}`}}>{value}</div>
            })


        let gridLayout = <div onMouseEnter={this.onmouseenter}
                              onMouseLeave={this.onmouseleave}
                              onClick={this.onclick}
                              className={this.classGrid}
                              style={style}>{components}</div>

        this.props.updateUserControl(GridLayout.REDUCER, this.id, {component: gridLayout})
        return null;
    }

    render() {
        if (!this.isValid())
            return this.resolve();

        return this.props.fetchUserControl(GridLayout.REDUCER, this.id).component ||
            this.props.component || null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridLayout)
