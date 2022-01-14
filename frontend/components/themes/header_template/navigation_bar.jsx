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
        let navs = ["Art & Collectibles", "Craft Supplies & Tools", "Books, Movies & Music", "Home & Living", "Home Decor", "Jewelry", "Toys & Games",
            "Kitchen & Dining", "Drink & Barware"];

        let components = navs.map(title => {
            return {header: title, link: `/products?taxonomy_path=${encodeURIComponent(title)}`}
        });

        return <NavbarLayout components={components}
                             className="navbar"
                             classHeader="navbar-link"
                             classDropper="navbar-dropdown"
                             classLinks="navbar-dropdown-link" />
    }
}