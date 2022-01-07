import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import React from 'react';
import "./navigation_bar.css"
import NavbarLayout from "../../user_controls/navbar/navbar";


export class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let navs = ["Cyber Sales Event", "Jewelry & Accessories", "Clothing & Shoes",
            "Home_page & Living", "Wedding & Party", "Toys & Entertainment", "Art & Collectibles",
            "Craft Supplies", "Gifts & Gift Cards"];

        let components = navs.map(title => {
            return {header: title, link: `/products`}
        });

        return <NavbarLayout components={components}
                             className="navbar"
                             classHeader="navbar-link"
                             classDropper="navbar-dropdown"
                             classLinks="navbar-dropdown-link" />
    }
}