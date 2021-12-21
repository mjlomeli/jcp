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


let defaultThumbnail = {
    title: "Baby Puzzles",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
    link: "/products"
}

class CircularThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.classGrid = `global-circular-thumbnail-grid`;
        this.classElements = `global-circular-thumbnail-items`;
    }

    componentDidMount() {
        if (!this.state.thumbnail)
            this.setState({thumbnail: defaultThumbnail});
    }

    resize(title){
        if (title && title.length > 17) {
            return `${title.slice(0, 17)}...`
        }
        return title;
    }

    render() {
        if (!this.state.thumbnail)
            return null;

        let thumbnail = this.state.thumbnail;
        let areas = ['image', 'image', 'image', 'image', 'title']
        let components = {
            'image': <div className="global-circular-thumbnail-image-div">
                <img className="global-circular-thumbnail-image" alt="img" src={thumbnail.imageUrl}/>
            </div>,
            'title': <label id="circular-title" className="global-circular-thumbnail-category">{this.resize(thumbnail.title)}</label>
        }
        return <Link to={thumbnail.link}>
            <GridLayout
                classGrid={this.classGrid}
                classElements={this.classElements}
                areas={areas}
                components={components} />
        </Link>
    }
}

export default CircularThumbnail