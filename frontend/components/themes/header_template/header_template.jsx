import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './menu_bar.css'
import SearchBarComponent from "../../user_controls/searchbar/searchbar";
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import NavbarLayout from "../../user_controls/navbar/navbar";
import "./navbar.css"

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.className = this.props.className || '';
        this.classElements = this.props.classElements || '';
    }

    button(icon, tooltip) {
        return <>
            <Link to="#" className="menu-button" style={{textDecoration: "inherit", color: "inherit"}}>
                {icon}
                <span className="tooltip" role="tooltip">{tooltip}</span>
            </Link>
        </>
    }

    signIn(){
        return this.button(<label className="menu-button">Sign In</label>, "Sign In")
    }

    favorites() {
        let icon = <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12,21C10.349,21,2,14.688,2,9,2,5.579,4.364,3,7.5,3A6.912,6.912,0,0,1,12,5.051,6.953,6.953,0,0,1,16.5,3C19.636,3,22,5.579,22,9,22,14.688,13.651,21,12,21ZM7.5,5C5.472,5,4,6.683,4,9c0,4.108,6.432,9.325,8,10,1.564-.657,8-5.832,8-10,0-2.317-1.472-4-3.5-4-1.979,0-3.7,2.105-3.721,2.127L11.991,8.1,11.216,7.12C11.186,7.083,9.5,5,7.5,5Z"/>
        </svg>
        return this.button(icon, "Favorites")
    }

    notifications() {
        let icon = <>
            <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="75.496 141 460.233 510">
                <path d="M530.4,559.2c-38.25-43.351-45.9-150.45-45.9-188.7c0-81.6-53.55-147.9-127.5-170.85V192c0-28.05-22.95-51-51-51 s-51,22.95-51,51l0,0v7.65C181.05,222.6,127.5,288.9,127.5,370.5c0,38.25-7.65,145.35-45.9,188.7c-7.65,7.649-7.65,17.85-2.55,28.05 C84.15,597.45,91.8,600,102,600h117.3c17.85,30.6,51,51,86.7,51s71.4-20.4,86.7-51H510c10.2,0,17.85-5.1,22.95-15.3 C538.05,574.5,535.5,564.3,530.4,559.2z M408,549H204h-56.1c30.6-68.85,30.6-165.75,30.6-178.5c0-71.4,56.1-127.5,127.5-127.5 c71.4,0,127.5,56.1,127.5,127.5c0,12.75,0,109.65,30.6,178.5H408z"/>
            </svg>
            <svg className="menu-icon-dropper" xmlns="http://www.w3.org/2000/svg" viewBox="191.25 345 229.5 153">
                <polygon points="420.75,345 306,498 191.25,345 "/>
            </svg>
        </>
        return this.button(icon, "Notifications")
    }

    account() {
        let icon = <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 90 612 609.75">
            <ellipse fill="#919191" cx="306" cy="394.875" rx="306" ry="304.875"/>
            <path fill="#919191" d="M306,396c56.1,0,102-45.9,102-102s-45.9-102-102-102c-56.1,0-102,45.9-102,102S249.9,396,306,396z M474.3,533.7C436.05,480.15,372.3,447,306,447s-130.05,33.15-168.3,86.7c-5.1,7.649-5.1,17.85-2.55,25.5 c5.1,10.2,15.3,15.3,25.5,15.3H453.9c10.199,0,17.85-5.1,22.949-12.75C479.4,551.55,479.4,541.35,474.3,533.7L474.3,533.7z"/>
            <ellipse fill="#D3D3D3" cx="306" cy="394.875" rx="306" ry="304.875"/>
            <path fill="#919191" d="M306,396c56.1,0,102-45.9,102-102s-45.9-102-102-102c-56.1,0-102,45.9-102,102S249.9,396,306,396z M474.3,533.7C436.05,480.15,372.3,447,306,447s-130.05,33.15-168.3,86.7c-5.1,7.649-5.1,17.85-2.55,25.5 c5.1,10.2,15.3,15.3,25.5,15.3H453.9c10.199,0,17.85-5.1,22.949-12.75C479.4,551.55,479.4,541.35,474.3,533.7L474.3,533.7z"/>
        </svg>
        return this.button(icon, "Account");
    }

    cart() {
        let icon = <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle cx="9" cy="20" r="2"/>
            <circle cx="16" cy="20" r="2"/>
            <path d="M21,5H5.665L4.978,1.79A1,1,0,0,0,4,1H1A1,1,0,0,0,1,3H3.191L6.022,16.21a0.962,0.962,0,0,0,.064.159,1.015,1.015,0,0,0,.063.155,0.978,0.978,0,0,0,.133.153,1.006,1.006,0,0,0,.088.1,1,1,0,0,0,.185.105,0.975,0.975,0,0,0,.107.06A0.994,0.994,0,0,0,7,17H18a1,1,0,0,0,.958-0.713l3-10A1,1,0,0,0,21,5Zm-2.244,5H16V7h3.656ZM7.819,15l-0.6-3H9v3H7.819ZM11,12h3v3H11V12Zm0-2V7h3v3H11ZM9,7v3H6.82L6.22,7H9Zm8.256,8H16V12h2.156Z"/>
        </svg>
        return this.button(icon, "Cart");
    }

    render() {
        let areas = ['favorites notifications account cart signin'];
        let components = {
            'signin': this.signIn(),
            'favorites': this.favorites(),
            'notifications': this.notifications(),
            'account': this.account(),
            'cart': this.cart()
        }
        return <GridLayout areas={areas} components={components} className={this.className}
                           classElements={this.classElements}/>
    }
}

class HeaderTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Enjoy Cyber Week deals on small business cheer!",
        }
    }

    navbar() {
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
                             classLinks="navbar-dropdown-link"
        />
    }

    logo() {
        return <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="197 666.784 63.668 48.396">
            <text transform="matrix(1 0 0 1 197 701.8945)" fill="#F1641E" fontFamily="'ArialMT'" fontSize="40.9137">Jcp</text>
        </svg>
    }

    render() {
        let headerBarAreas = ['logo s s s s s s s s s navlinks'];
        let headerBarComponents = {
            'logo': <Link to="/home">{this.logo()}</Link>,
            's': <SearchBarComponent/>,
            'navlinks': <MenuBar className="menu-bar-grid" classElements="menu-bar-grid-elements"/>
        }
        let headerBarLayout = <GridLayout areas={headerBarAreas} components={headerBarComponents}
                                          className="header-grid" classElements="header-grid-elements"/>
        return <>
            <div className="navlinks">
                {headerBarLayout}
                {this.navbar()}
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate);