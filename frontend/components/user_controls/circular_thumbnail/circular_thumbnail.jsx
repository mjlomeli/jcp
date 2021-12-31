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

const defaultTitleStyle = {fontWeight: "640", fontSize: "2vw", position: "relative", wordWrap: "break-word", borderBottom: "0.5vw solid transparent"}
const defaultImageStyle = {}
const defaultElementsStyle = {display: "flex", justifyContent: "center", borderBottom: "0.5vw solid transparent"}
const defaultGridStyle = {gridGap: "1vw", border: "1vw solid transparent", objectFit: "scale-down"}

class CircularThumbnail extends React.Component {
    #titleStyle = {}
    #imageStyle = {}
    #elementsStyle = {}
    #gridStyle = {}

    static CLASS_PROPS = ['className', 'classImage', 'classTitle', 'classGrid', 'classElements'];
    static DATA_PROPS = ['title', 'image', 'link'];
    static hasClassProps(props) {
        return CircularThumbnail.CLASS_PROPS.some(elem => elem in props)
    }
    static hasComponentData(props) {
        return CircularThumbnail.DATA_PROPS.some(elem => elem in props)
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.usingDefaultClass = !CircularThumbnail.hasClassProps(props);
        this.usingDefaultData = !CircularThumbnail.hasComponentData(props);

        this.className = '';
        this.classImage = '';
        this.classTitle = '';
        this.classGrid = '';
        this.classElements = '';

        this.#assignClassNames(props);
    }

    #assignClassNames(props){
        if (!this.usingDefaultClass) {
            this.className = props.className || '';
            this.classImage = props.classImage || '';
            this.classTitle = props.classTitle || '';
            this.classGrid = props.classGrid || '';
            this.classElements = props.classElements || '';
        } else {
            this.#titleStyle = {...this.#itemsStyle, ...defaultTitleStyle};
            this.#imageStyle = {...this.#itemsStyle, ...defaultImageStyle};
            this.#elementsStyle = {...this.#itemsStyle, ...defaultElementsStyle};
            this.#gridStyle = {...this.#gridStyle, ...defaultGridStyle};
        }
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