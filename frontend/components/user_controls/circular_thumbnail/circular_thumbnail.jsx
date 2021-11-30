import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './circular_thumbnail.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

let defaultThumbnail = {
    title: "Baby Puzzles",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
    link: "/products"
}

class CircularThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            imageUrl: props.imageUrl,
            link: props.link
        }

        if (typeof this.state.title === "undefined")
            this.state = {...defaultThumbnail};

        this.classGrid = `global-circular-thumbnail-grid`;
        this.classItems = `global-circular-thumbnail-items`;

        this.onclick = props.onClick || this.onClick.bind(this);
    }

    resize(title){
        if (title.length > 17) {
            return `${title.slice(0, 17)}...`
        }
        return title;
    }

    componentDidMount() {
        // TODO: make sure title is resized
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
    }

    render() {
        let areas = ['image', 'image', 'image', 'title']
        let components = {
            'image': <div className="global-circular-thumbnail-image-div">
                <img className="global-circular-thumbnail-image" alt="img" aria-hidden="true" src={this.state.imageUrl}/>
            </div>,
            'title': <label id="circular-title" className="global-circular-thumbnail-category">{this.resize(this.state.title)}</label>
        }
        return <Link to={this.state.link}>
            <GridLayout
                classGrid={this.classGrid}
                classItems={this.classItems}
                areas={areas}
                components={components} />
        </Link>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircularThumbnail);