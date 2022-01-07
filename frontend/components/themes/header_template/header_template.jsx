import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import "./header_template.css"
import SearchBarComponent from "../../user_controls/searchbar/searchbar";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {NavigationBar} from "./navigation_bar";
import ProfileTool from "./profile_tool"

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
});

export class HeaderTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    logo() {
        return <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-10 125.5 612 367">
            <text transform="matrix(1 0 0 1 -10 411.6875)" fill="#F1641E" fontFamily="'ArialMT'" fontSize="393.2774">Jcp</text>
        </svg>

    }

    render() {
        let headerBarAreas = ['logo s s s s s s s s s navlinks'];
        let headerBarComponents = {
            'logo': <Link to="/home">{this.logo()}</Link>,
            's': <SearchBarComponent/>,
            'navlinks': <ProfileTool />
        }
        let toolbar = <GridLayout areas={headerBarAreas} components={headerBarComponents}
                                  className="header-grid" classElements="header-grid-elements"/>
        return <>
            <div className="navlinks">
                {toolbar}
                <NavigationBar />
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate);