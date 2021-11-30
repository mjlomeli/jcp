import {connect} from 'react-redux';
import React from 'react';
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

        this.onclick = this.onClick.bind(this);
        this.onchange = this.onChange.bind(this);
    }

    onClick(e){
        e.preventDefault();
        let search_query = e.currentTarget.value;
        // use the search query to route to a products page with the query results
    }

    onChange(e){
        e.preventDefault();
    }

    render() {
        return <form className="searchbar-form">
            <div className="search-bar">
                <input type="text" className="search-input" name="search-field" onClick={this.onclick} onChange={this.onchange}/>
                <button type="submit" className="search-button">
                    <span className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18ZM10,4a6,6,0,1,0,6,6A6.007,6.007,0,0,0,10,4Z"/>
                            <path d="M21,22a1,1,0,0,1-.707-0.293l-4-4a1,1,0,0,1,1.414-1.414l4,4A1,1,0,0,1,21,22Z"/>
                        </svg>
                    </span>
                </button>
            </div>
        </form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);