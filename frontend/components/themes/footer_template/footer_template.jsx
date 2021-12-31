import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './footer_template.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class FooterTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: this.props.shop || {"link1": null, "link2": null},
            sell: this.props.sell || {"link1": null, "link2": null},
            about: this.props.about || {"link1": null, "link2": null},
            help: this.props.help || {"link1": null, "link2": null},
            follow: this.props.follow || [{link: null, svg: "hello"}]
        }
    }

    topFooter() {
        return <div>
            <svg className="mountain-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 424 14">
                <path fill="#4D6BC6" d="M424.5,18.507l-3.97-0.148l-1.312,0.437h-1.749l-0.438-0.437h-1.749l-0.873-0.438h-7.869l-1.312,0.438 h-1.749l-0.438-0.438l-0.438,0.438h-0.874l-0.438-0.438h-3.06l-0.874,0.438h-0.438l-0.438-0.438l-1.748,0.438h-4.81l-0.875,0.437 h-0.874v0.438l-0.437-0.438l-1.749-0.437h-0.438l-0.875-0.438v-0.438l-1.748-0.438l-1.749-0.437l-1.312,0.437l0.438-0.437h-0.875 l-0.438-0.438h-0.874l0.438-0.437h-0.875l-1.313-0.438l-2.186-0.438l-2.623-0.438l-1.749-0.437l-0.873-0.874l-1.749,0.438h-1.313 l-1.748-0.875l-0.875,0.438h-3.934l-0.438-0.438h-0.438l-0.438,0.438l-0.437-0.875l-2.188,0.438h-0.873l-1.313,0.438l-1.748-0.875 l-1.312-0.438l-2.187-0.438l-1.312,0.438l-0.875-0.875l-0.425-0.428l-0.437-0.438h-0.875l-0.438-0.438l-3.06-0.875h-0.438 l-0.438-0.437h-1.313l-1.749-1.313l-0.437,0.438l-1.749-0.438L333.1,6.557h-1.749l-1.312-0.438l-0.438-0.438h-1.748l-0.875-0.874 h-1.311l-1.313-1.313h-0.872l-0.875-0.438h-0.874l-2.188-0.438l-0.437,0.438l-1.313-0.438l-1.748-0.875V1.309l-3.061,0.437 l0.438-0.437h-4.809l-2.187-0.875h-1.311l-0.875,0.438v0.874l-0.874,0.438h-3.934l-1.312,0.874l-1.749-0.438h-2.186l-1.312,0.438 H290.7l-2.186-0.438l-0.438-0.438l-0.874,0.438h-2.186l-0.875-0.438h-1.748l-1.749-0.438h-1.748l-0.875,0.438l-1.748-0.874h-0.438 l-0.874,0.437l-0.874-0.437l-0.438,0.874l-0.438-0.438l-0.874,0.438L271.9,1.745h-6.558V1.308l-1.312,0.437h-0.438l-1.311,0.438 l-0.438-0.438l-0.438,0.438h-0.874l-2.623-0.874l-0.437,0.437l-1.312-0.437h-1.312l-1.312-0.438h-1.312l-3.497-0.874l-2.186,0.438 v-0.438l-0.875,0.438h-0.428v0.005l-3.061,0.438l-1.748,0.438l-0.874-0.438h-1.749l-1.312,0.438l-1.312,0.437l-0.874-0.437 l-0.438,0.437l-3.497,0.438l-0.874-0.438h-1.749l-2.186,0.438l-0.874,0.438h-2.186l-0.874,0.438l-0.438-0.438h-2.623l-0.874,0.438 h-3.935l-0.874,0.438h-1.749l-1.312,0.438h-11.803V3.503h-4.371l-0.438-0.438H191.9l-1.311,0.438l-0.438-0.438h-4.809l-2.623-0.874 v0.438h-1.748l-0.438,0.438h-4.371l-0.875-0.438h-3.06l-0.874-0.438h-1.312l-0.875-0.438H168.3l-0.437,0.438h-2.623V1.753h-0.875 l-0.437,0.438l-0.438-0.438h-0.437l-1.312-0.437h-3.061l-0.437-0.438h-2.623l-0.438,0.438h-1.312l-0.437-0.438l-2.187,0.438h-7.431 l-1.749,0.437h-1.748l-1.312-0.437h-0.875l-0.437-0.438h-8.306l-0.875,0.438h-2.186V0.878l-0.437,0.438h-0.875l-0.437-0.438h-3.935 l-0.438,0.438l-0.437-0.438l-1.749,0.438h-5.245l-0.438,0.437h-1.749l-0.437,0.438h-0.874l-1.312,0.438h-2.186v0.438h-4.809 l-0.438-0.438H97.92l-0.874-0.438h-1.312l-0.438,0.438l-0.874,0.438h-0.438L93.11,3.504h-2.186L90.05,3.941l-0.875-0.438h-0.874 l-0.874-0.438h-2.186l-0.438-0.438h-0.874l-0.875-0.438H82.62l-0.438,0.874l-0.437,0.438L80.87,3.94H76.5l-0.874-0.438h-2.623 l-0.438-0.438h-0.874l-0.438,0.874l-0.874,0.438l-0.437,0.438l-0.875,0.437h-5.245l-0.438-0.437H55.08l-0.438,0.437H52.02 L51.583,5.69l-1.312-0.438H47.21l-0.874-0.874L45.899,3.94l-3.061,0.438l-0.437,0.438l-0.875,0.437H39.78l-0.875,0.438l-0.437,0.438 h-2.623l-0.438,0.438l-0.874-0.438l-1.312,0.438h-3.934l-0.438,0.438h-0.874L27.1,7.442h-0.874l-0.438,0.437h-0.437l-1.749,0.438 L22.29,7.879h-0.437l-0.438,0.438h-0.874l-0.438,0.437l-0.874,0.438H18.36L17.485,9.63v0.438H12.24l-1.311,0.427h-0.874L9.18,10.931 H8.306l-1.312-0.438l-0.438,0.438l-0.437,0.437H0v9.617h424.5"/>
            </svg>
            <a className="educated-by" href="#">
                JCP is powered by 100% renewable electricity.
            </a>
        </div>
    }

    links(title, links) {
        return <div>
            <h3>{title}</h3>
            <ul className="footer-list-container">
                <li className="footer-list">
                    {Object.entries(links).map((pair, idx) => {
                        let [name, link] = pair;
                        return <Link key={idx} to={link || "#"}>{name}</Link>
                    })}
                </li>
            </ul>
        </div>
    }

    follow(title, links){
        return <div>
            <h3>{title}</h3>
            <ul className="footer-list-container">
                <li className="footer-follow-list">
                    {links.map((obj, idx) => {
                        let {link, svg} = obj;
                        return <a key={idx} href={link || "#"}>{svg}</a>
                    })}
                </li>
            </ul>
        </div>
    }

    render() {
        let areas = ["shop sell about help follow"];
        let components = {
            shop: this.links("Shop", this.state.shop),
            sell: this.links("Sell", this.state.sell),
            about: this.links("About", this.state.about),
            help: this.links("Help", this.state.help),
            follow: this.follow("Follow", this.state.follow)
        }

        return <footer className="footer">
            {this.topFooter()}
            <nav className="footer-links">
                <GridLayout areas={areas} components={components} className="footer-grid" classElements="footer-grid-elements"/>
            </nav>
        </footer>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterTemplate);