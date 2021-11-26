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
    constructor(props) {
        super(props);
        this.state = {}
        this.navEntries = props.navEntries;
        if (isHTML(this.navEntries))
            throw new NavbarEntriesError();
    }

    navDropDown(navTitle, navElement){
        let dropdowns = Object.entries(navElement).map(
            (pair, idx) => {
                let [title, element] = pair;
                if (isHTML(element))
                    return <React.Fragment key={idx}>{element}</React.Fragment>;
                return <a key={idx} className={`navbar-dropdown-link navbar-dropdown-link-${title}`}
                          href={`${element}`}>
                    {`${title}`}
                </a>
            })

        return <div className={`navbar-dropdown navbar-dropdown-${navTitle.toLowerCase()}`}>
                <button className="dropbtn">Dropdown
                    <i className="fa fa-caret-down" />
                </button>
                <div className={`dropdown-content dropdown-content-${navTitle.toLowerCase()}`}>
                    {dropdowns}
                </div>
            </div>

    }

    navLink(navTitle, navElement){
        if (isHTML(navElement))
            return navElement;
        return <a className={`navbar-link navbar-link-${navTitle.toLowerCase()}`} href={`${navElement}`}>
            {`${navTitle}`}
        </a>
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
            Object.entries(this.navEntries).map(
                (navObject, idx) => <React.Fragment key={idx}>
                    { this.generateNavElement(navObject) }
                </React.Fragment>
            )
        }</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLayout);