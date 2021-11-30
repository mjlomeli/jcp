import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './navbar.css'
import {isHTML} from '../../../utils/component_utils'
import {NavbarEntriesError, NavbarEntriesTitleErrors} from "./navbar_error";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class NavbarLayout extends React.Component {
    static defaultNavEntries = {
        "Home": "/home",    // no dropdown
        "Products": "/products",    // no dropdown
        "Dropdown": {   // has 3 drop downs
            "link 1": "/nav_bar",
            "link 2": "/nav_bar",
            "link 3": "/nav_bar"
        }
    }

    constructor(props) {
        super(props);
        let navEntries = props.navEntries || NavbarLayout.defaultNavEntries;
        if (isHTML(navEntries))
            throw new NavbarEntriesError();
        this.state = {...navEntries}
    }

    navDropDown(navTitle, navElement){
        let dropdowns = Object.entries(navElement).map(
            (pair, idx) => {
                let [title, element] = pair;
                if (isHTML(element))
                    return <React.Fragment key={idx}>{element}</React.Fragment>;
                return <Link key={idx} className={`navbar-dropdown-link navbar-dropdown-link-${title}`}
                          to={`${element}`}>
                    {`${title}`}
                </Link>
            })

        return <div className={`navbar-dropdown navbar-dropdown-${navTitle.toLowerCase()}`}>
                <Link to="/nav_bar" className="dropbtn">{navTitle} <i className="fa fa-caret-down" />
                </Link>
                <div className={`dropdown-content dropdown-content-${navTitle.toLowerCase()}`}> {dropdowns}
                </div>
            </div>

    }

    navLink(navTitle, navElement){
        if (isHTML(navElement))
            return navElement;
        return <Link className={`navbar-link navbar-link-${navTitle.toLowerCase()}`} to={`${navElement}`}>
            {`${navTitle}`}
        </Link>
    }

    generateNavElement(navObject){
        let [navTitle, navElement] = navObject;
        if (isHTML(navTitle))
            throw new NavbarEntriesTitleErrors()
        else if (typeof navElement === 'string' || navElement instanceof String || isHTML(navElement))
            return this.navLink(navTitle, navElement);
        else
            return this.navDropDown(navTitle, navElement);
    }

    render() {
        return <div className="navbar">{
            Object.entries(this.state).map(
                (navObject, idx) => <React.Fragment key={idx}>
                    { this.generateNavElement(navObject) }
                </React.Fragment>
            )
        }</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLayout);