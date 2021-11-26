import {connect} from 'react-redux';
import React from 'react';
import './navbar.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: 7.47, discount: 0.6}
    }

    render() {
        return <>
        </>
    }
}

class NavbarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.navEntries = props.navEntries;
        console.log(JSON.stringify(this.navEntries));
    }

    navDropDown(navTitle, navElement){
        let dropdowns = Object.entries(navElement).map(
            (pair, idx) => {
                let [title, link] = pair;
                return <a key={idx} className={`navbar-dropdown-link navbar-dropdown-link-${title}`}
                          href={`${link}`}>
                    {`${title}`}
                </a>
            })

        return <div className={`navbar-dropdown navbar-dropdown-${navTitle.toLowerCase()}`}>
                <button className="dropbtn">Dropdown
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className={`dropdown-content dropdown-content-${navTitle.toLowerCase()}`}>
                    {dropdowns}
                </div>
            </div>

    }

    navLink(navTitle, navElement){
        return <a className={`navbar-link navbar-link-${navTitle.toLowerCase()}`} href={`${navElement}`}>
            {`${navTitle}`}
        </a>
    }

    generateNavElement(navObject){
        let [navTitle, navElement] = navObject;
        if (typeof navElement === 'string' || navElement instanceof String)
            return this.navLink(navTitle, navElement);
        else
            return this.navDropDown(navTitle, navElement);
    }

    render() {
        return <div className="navbar">{
            Object.entries(this.navEntries).map(
                navObject => {
                    return this.generateNavElement(navObject)
                }
            )
        }</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLayout);