import {connect} from 'react-redux';
import React from 'react';
import './header_template.css'
import './navlinks_template.css'
import './navbar_template.css'
import SearchBarComponent from "../../user_controls/searchbar/searchbar_component";
import GridLayout from "../../user_controls/grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class NavLinksComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    favorites(){
        return <>
            <div className="nav-link-list">
                <a href="#" className="favorites-nav-link nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M12,21C10.349,21,2,14.688,2,9,2,5.579,4.364,3,7.5,3A6.912,6.912,0,0,1,12,5.051,6.953,6.953,0,0,1,16.5,3C19.636,3,22,5.579,22,9,22,14.688,13.651,21,12,21ZM7.5,5C5.472,5,4,6.683,4,9c0,4.108,6.432,9.325,8,10,1.564-.657,8-5.832,8-10,0-2.317-1.472-4-3.5-4-1.979,0-3.7,2.105-3.721,2.127L11.991,8.1,11.216,7.12C11.186,7.083,9.5,5,7.5,5Z" />
                    </svg>
                </a>
                <span role="tooltip">Favorites</span>
            </div>
        </>
    }

    notifications(){
        return <>
            <div className="nav-link-list">
                <button type="button" className="notifications-nav-link nav-link">
                    <svg className="notifications-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M20.8,18.4C19.3,16.7,19,12.5,19,11c0-3.2-2.1-5.8-5-6.7V4c0-1.1-0.9-2-2-2s-2,0.9-2,2l0,0v0.3C7.1,5.2,5,7.8,5,11 c0,1.5-0.3,5.7-1.8,7.4c-0.3,0.3-0.3,0.7-0.1,1.1S3.6,20,4,20h4.6c0.7,1.2,2,2,3.4,2s2.8-0.8,3.4-2H20c0.4,0,0.7-0.2,0.9-0.6 S21,18.6,20.8,18.4z M16,18H8H5.8C7,15.3,7,11.5,7,11c0-2.8,2.2-5,5-5s5,2.2,5,5c0,0.5,0,4.3,1.2,7H16z" />
                    </svg>
                    <svg className="dropdown-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <polygon points="16.5 10 12 16 7.5 10 16.5 10" />
                    </svg>
                </button>
                <span role="tooltip">Updates</span>
            </div>
        </>
    }

    account(){
        return <>
            <div className="nav-link-list">
                <button type="button" className="account-nav-link nav-link">
                    <svg className="account-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="#d3d3d3" d="M0 0h24v24H0z"/>
                        <path fill="#919191" d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm6.6 5.4c-1.5-2.1-4-3.4-6.6-3.4s-5.1 1.3-6.6 3.4c-.2.3-.2.7-.1 1 .2.4.6.6 1 .6h11.5c.4 0 .7-.2.9-.5.1-.4.1-.8-.1-1.1z"/>
                    </svg>
                    <svg className="dropdown-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <polygon points="16.5 10 12 16 7.5 10 16.5 10" />
                    </svg>
                </button>
                <span role="tooltip">Your account</span>
            </div>
        </>
    }

    cart(){
        return <>
            <div className="nav-link-list">
                <a href="#" className="cart-nav-link nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <circle cx="9" cy="20" r="2" />
                        <circle cx="16" cy="20" r="2" />
                        <path d="M21,5H5.665L4.978,1.79A1,1,0,0,0,4,1H1A1,1,0,0,0,1,3H3.191L6.022,16.21a0.962,0.962,0,0,0,.064.159,1.015,1.015,0,0,0,.063.155,0.978,0.978,0,0,0,.133.153,1.006,1.006,0,0,0,.088.1,1,1,0,0,0,.185.105,0.975,0.975,0,0,0,.107.06A0.994,0.994,0,0,0,7,17H18a1,1,0,0,0,.958-0.713l3-10A1,1,0,0,0,21,5Zm-2.244,5H16V7h3.656ZM7.819,15l-0.6-3H9v3H7.819ZM11,12h3v3H11V12Zm0-2V7h3v3H11ZM9,7v3H6.82L6.22,7H9Zm8.256,8H16V12h2.156Z" />
                    </svg>
                </a>
                <span role="tooltip">Cart</span>
            </div>
        </>
    }

    backup(){
        return <ul id="nav-links" className="nav-links">
            <li id="favorites" className="nav-link-list">
                <a href="#" className="favorites-nav-link nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M12,21C10.349,21,2,14.688,2,9,2,5.579,4.364,3,7.5,3A6.912,6.912,0,0,1,12,5.051,6.953,6.953,0,0,1,16.5,3C19.636,3,22,5.579,22,9,22,14.688,13.651,21,12,21ZM7.5,5C5.472,5,4,6.683,4,9c0,4.108,6.432,9.325,8,10,1.564-.657,8-5.832,8-10,0-2.317-1.472-4-3.5-4-1.979,0-3.7,2.105-3.721,2.127L11.991,8.1,11.216,7.12C11.186,7.083,9.5,5,7.5,5Z" />
                    </svg>
                </a>
                <span role="tooltip">Favorites</span>
            </li>
            <li id="notifications" className="nav-link-list">
                <button type="button" className="notifications-nav-link nav-link">
                    <svg className="notifications-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M20.8,18.4C19.3,16.7,19,12.5,19,11c0-3.2-2.1-5.8-5-6.7V4c0-1.1-0.9-2-2-2s-2,0.9-2,2l0,0v0.3C7.1,5.2,5,7.8,5,11 c0,1.5-0.3,5.7-1.8,7.4c-0.3,0.3-0.3,0.7-0.1,1.1S3.6,20,4,20h4.6c0.7,1.2,2,2,3.4,2s2.8-0.8,3.4-2H20c0.4,0,0.7-0.2,0.9-0.6 S21,18.6,20.8,18.4z M16,18H8H5.8C7,15.3,7,11.5,7,11c0-2.8,2.2-5,5-5s5,2.2,5,5c0,0.5,0,4.3,1.2,7H16z" />
                    </svg>
                    <svg className="dropdown-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <polygon points="16.5 10 12 16 7.5 10 16.5 10" />
                    </svg>
                </button>
                <span role="tooltip">Updates</span>
            </li>
            <li id="account" className="nav-link-list">
                <button type="button" className="account-nav-link nav-link">
                    <svg className="account-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="#d3d3d3" d="M0 0h24v24H0z"/>
                        <path fill="#919191" d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm6.6 5.4c-1.5-2.1-4-3.4-6.6-3.4s-5.1 1.3-6.6 3.4c-.2.3-.2.7-.1 1 .2.4.6.6 1 .6h11.5c.4 0 .7-.2.9-.5.1-.4.1-.8-.1-1.1z"/>
                    </svg>
                    <svg className="dropdown-icon icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <polygon points="16.5 10 12 16 7.5 10 16.5 10" />
                    </svg>
                </button>
                <span role="tooltip">Your account</span>
            </li>
            <li id="cart" className="nav-link-list">
                <a href="#" className="cart-nav-link nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <circle cx="9" cy="20" r="2" />
                        <circle cx="16" cy="20" r="2" />
                        <path d="M21,5H5.665L4.978,1.79A1,1,0,0,0,4,1H1A1,1,0,0,0,1,3H3.191L6.022,16.21a0.962,0.962,0,0,0,.064.159,1.015,1.015,0,0,0,.063.155,0.978,0.978,0,0,0,.133.153,1.006,1.006,0,0,0,.088.1,1,1,0,0,0,.185.105,0.975,0.975,0,0,0,.107.06A0.994,0.994,0,0,0,7,17H18a1,1,0,0,0,.958-0.713l3-10A1,1,0,0,0,21,5Zm-2.244,5H16V7h3.656ZM7.819,15l-0.6-3H9v3H7.819ZM11,12h3v3H11V12Zm0-2V7h3v3H11ZM9,7v3H6.82L6.22,7H9Zm8.256,8H16V12h2.156Z" />
                    </svg>
                </a>
                <span role="tooltip">Cart</span>
            </li>
        </ul>
    }

    render() {
        let navlinkAreas = ['favorites notifications account cart'];
        let components = {
            'favorites': this.favorites(),
            'notifications': this.notifications(),
            'account': this.account(),
            'cart': this.cart()
        }
        return <GridLayout areas={navlinkAreas} components={components}/>
    }
}

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onMouseEnter(e) {
        let element = e.currentTarget
        if (element.classList.contains("navbar-component-mouse-leave")) {
            e.currentTarget.classList.replace('navbar-component-mouse-leave','navbar-component-mouse-enter')
        }

    }

    onMouseLeave(e){
        let element = e.currentTarget
        if (element.classList.contains("navbar-component-mouse-enter")) {
            e.currentTarget.classList.replace('navbar-component-mouse-enter','navbar-component-mouse-leave')
        }
    }

    render(){
        return <div className="navbar">
            <ul className="navbar-list" role="menubar">
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Cyber Sales Event</a></li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Jewelry &amp; Accessories</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Clothing &amp; Shoes</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Home &amp; Living</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Wedding &amp; Party</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Toys &amp; Entertainment</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Art &amp; Collectibles</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Craft Supplies</a>
                </li>
                <li className="navbar-component-mouse-leave" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <a href="#">Gifts &amp; Gift Cards</a>
                </li>
            </ul>
        </div>
    }
}

class HeaderTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Enjoy Cyber Week deals on small business cheer!",
        }
    }

    logo(){
        return <svg className="logo" xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="197 198.5 179.5 123">
            <text transform="matrix(1 0 0 1 197 291.499)" fill="#F1641E" fontFamily="'Microsoft-Himalaya'" fontSize="100">Jcp</text>
        </svg>
    }

    render() {
        let headerBarAreas = ['logo search search search navlinks'];
        let headerBarComponents = {
            'logo': this.logo(),
            'search': <SearchBarComponent />,
            'navlinks': <NavLinksComponent />
        }
        let headerBarLayout = <GridLayout areas={headerBarAreas} components={headerBarComponents}/>
        return <>

            {headerBarLayout}
            <NavBarComponent />
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate);