import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import '../../themes/header_template/navbar.css'
import {isHTML} from '../../../utils/component_utils'
import {DropdownLayout} from "./dropdown";
import {NavbarEntriesError, NavbarEntriesTitleErrors} from "./navbar_error";
import CardListing from "../card_listing/card_listing";
import CardFeatured from "../card_featured/card_featured";

const mapStateToProps = ({entities, session, errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});


const defaultNavbarStyle = {
    overflow: "hidden"
};

const defaultNavEntries = [
    {header: "Home", link: "/home"},
    {header: "Clothing & Shoes", link: "#", components: <ul>
            <li>link 1</li>
            <li>link 2</li>
            <li>link 3</li>
        </ul>
    },
    {header: "Home & Living", link: "#", components: {
            "#": <ul>
                <li>link 1</li>
                <li>link 2</li>
                <li>link 3</li>
            </ul>
        }
    },
    {header: "Wedding & Part", link: "#", components: {
            "#": <ul>
                <li>link 1</li>
                <li>link 2</li>
                <li>link 3</li>
            </ul>
        }
    },
    {header: "Toys & Entertainment", components: {
            "#": <ul>
                <li>link 1</li>
                <li>link 2</li>
                <li>link 3</li>
            </ul>
        }
    },
    {header: "Art & Collectibles", components: {
            "#": <ul>
                <li>link 1</li>
                <li>link 2</li>
                <li>link 3</li>
            </ul>
        }
    },
    {header: "Craft Supplies", components: {"link 1": <CardFeatured/>}},
    {header: "Gifts & Gift Cards", components: {
            "link 1": "/nav_bar",
            "link 2": "/nav_bar",
            "#": <CardListing/>
        }
    }
]

class NavbarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {headerStyle: {}}

        this.classes = {}
        this.className = '';
        this.headerClass = '';
        this.dropperClass = '';
        this.linksClass = '';

        this.hoverClass = '';
        this.headerHoverClass = '';
        this.linksHoverClass = '';

        this.#assignClassNames(props);
    }

    #assignClassNames(props) {
        this.className = props.className || '';
        this.headerClass = props.headerClass || '';
        this.dropperClass = props.dropperClass || '';
        this.linksClass = props.linksClass || '';

        this.hoverClass = props.hoverClass || '';
        this.headerHoverClass = props.headerHoverClass || '';
        this.linksHoverClass = props.linksHoverClass || '';

        if (props.className) this.classes.className = props.className;
        if (props.headerClass) this.classes.headerClass = props.headerClass;
        if (props.dropperClass) this.classes.dropperClass = props.dropperClass;
        if (props.linksClass) this.classes.linksClass = props.linksClass;
        if (props.hoverClass) this.classes.hoverClass = props.hoverClass;
        if (props.headerHoverClass) this.classes.headerHoverClass = props.headerHoverClass;
        if (props.linksHoverClass) this.classes.linksHoverClass = props.linksHoverClass;
    }

    render() {
        let components = this.props.components || defaultNavEntries;
        if (isHTML(components))
            throw new NavbarEntriesError();
        return <div className={this.className}>{
            components.map((dropDown, idx) => {
                let {header, link, components} = dropDown;
                return <DropdownLayout key={idx}
                                       header={header}
                                       link={link}
                                       components={components} {...this.classes}
                                       // className={this.className}
                                       // headerClass={this.headerClass}
                                       // dropperClass={this.dropperClass}
                                       // linksClass={this.linksClass}
                                       // hoverClass={this.hoverClass}
                                       // headerHoverClass={this.headerHoverClass}
                                       // linksHoverClass={this.linksHoverClass}
                />
            })
        }</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLayout);