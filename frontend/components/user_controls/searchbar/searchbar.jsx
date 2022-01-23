import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    useHistory,
    withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './searchbar.css'
import {DropdownLayout} from "../navbar/dropdown";
import {fetchProductsAsQuery} from "../../../actions/product_action";
import {systemError} from "../../../actions/alert_action";

const mapStateToProps = ({errors, index}, ownProps) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    tri: index.titles.tri,
    data: index.titles.data
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: (ids, query) => dispatch(fetchProductsAsQuery(ids, query)),
    notifyError: (message) => dispatch(systemError([message]))
});

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: "", results: {}, focused: false}
        this.onclick = this.props.onClick || this.onClick.bind(this);
        this.onclicklink = this.props.onClickLink || this.onClickLink.bind(this);
        this.onchange = this.props.onChange || this.onChange.bind(this);
        this.onfocusin = this.props.onFocus || this.onFocusIn.bind(this);
        this.onfocusout = this.props.onBlur || this.onFocusOut.bind(this);
    }

    onClick(e) {
        let query = this.state.query;
        if (query === "")
            return;
        this.props.history.push(`/products?query=${query}`);
    }

    onClickLink(title) {
        return (e) => {
            this.setState({query: title, results: {}})
        }
    }

    onFocusIn(e){
        if (!this.state.focused)
            this.setState({focused: true});
    }

    onFocusOut(e){
        if (this.state.focused)
            Promise.resolve().then(
                _ => setTimeout(() => this.setState({focused: false}), 300)
            )
    }

    onChange(e) {
        let results = {};
        let query = (e.currentTarget.value || "").toLowerCase();
        if (query !== "" && this.props.tri) {
            this.props.tri.getLike(query).slice(0,5).forEach(result => {
                let result_data = this.props.data[result];
                let title = result_data.title;
                let id = result_data.id;
                results[title] = <Link to={`/product/${id}`} onClick={this.onclicklink(title)}
                                       style={{textDecoration: "none", color: "black"}}>
                    <div className="tool-account-item">
                        {title}
                    </div>
                </Link>
            })
        }
        this.setState({query: e.currentTarget.value, results: results});
    }

    searchComponent() {
        return <div className="search-bar">
            <input type="text" className="search-input" name="search-field" autoComplete="off"
                   onChange={this.onchange} onFocus={this.onfocusin}
                   onBlur={this.onfocusout} value={this.state.query}/>
            <button type="submit" className="search-button" onClick={this.onclick}>
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="51 141 509.994 510">
                    <path
                        d="M255,549c-112.666,0-204-91.334-204-204s91.334-204,204-204s204,91.334,204,204C458.873,457.613,367.613,548.873,255,549z M255,192c-84.5,0-153,68.5-153,153c0,84.5,68.5,153,153,153c84.5,0,153-68.5,153-153C407.901,260.541,339.459,192.099,255,192z"/>
                    <path
                        d="M535.5,651c-6.763-0.001-13.247-2.689-18.028-7.472l-102-102c-9.784-10.13-9.503-26.273,0.627-36.057 c9.882-9.544,25.548-9.544,35.43,0l102,102c9.957,9.96,9.954,26.105-0.005,36.063C548.742,648.313,542.26,650.998,535.5,651z"/>
                </svg>
            </button>
        </div>
    }

    render() {
        return <DropdownLayout header={this.searchComponent()}
                               components={this.state.results}
                               className="search-dropdown"
                               classHeader="search-header"
                               classHeaderHover="search-header-hover"
                               classDropper="search-dropper"
                               dropperVisible={this.state.focused}
                               dropperId="search"
                               />
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));