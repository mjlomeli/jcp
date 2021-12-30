import {connect} from 'react-redux';
import React from 'react';
import GridLayout from "../grid_layout/grid_layout";
import './searchbar.css'

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: "This is some text"}
        this.onclick = this.props.onClick || this.onClick.bind(this);
        this.onchange = this.props.onChange || this.onChange.bind(this);
    }

    onClick(e) {
        let search_query = e.currentTarget.value;
        // use the search query to route to a products page with the query results
    }

    onChange(e) {
        this.setState({query: e.currentTarget.value})
    }

    render() {
        return <div className="search-bar">
            <input type="text" className="search-input" name="search-field" onClick={this.onclick}
                   onChange={this.onchange} value={this.state.query}/>
            <button type="submit" className="search-button">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="51 141 509.994 510">
                    <path d="M255,549c-112.666,0-204-91.334-204-204s91.334-204,204-204s204,91.334,204,204C458.873,457.613,367.613,548.873,255,549z M255,192c-84.5,0-153,68.5-153,153c0,84.5,68.5,153,153,153c84.5,0,153-68.5,153-153C407.901,260.541,339.459,192.099,255,192z"/>
                    <path d="M535.5,651c-6.763-0.001-13.247-2.689-18.028-7.472l-102-102c-9.784-10.13-9.503-26.273,0.627-36.057 c9.882-9.544,25.548-9.544,35.43,0l102,102c9.957,9.96,9.954,26.105-0.005,36.063C548.742,648.313,542.26,650.998,535.5,651z"/>
                </svg>
            </button>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);