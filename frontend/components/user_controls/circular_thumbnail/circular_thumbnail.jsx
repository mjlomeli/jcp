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
    link: "/products",
    imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg",
}

const defaultTitleStyle = {
    position: "relative",
    fontWeight: "640",
    fontSize: "1em",
    wordWrap: "break-word",
    borderBottom: "0.1em solid black",
    textAlign: "center"
}
const defaultImageStyle = {width: "200px", height: "200px"}

class CircularThumbnaill extends React.Component {
    #titleStyle = {}
    #imageStyle = {borderRadius: "50%"}

    static CLASS_PROPS = ['className', 'classImage', 'classTitle', 'classGrid', 'classElements'];
    static DATA_PROPS = ['title', 'image', 'link'];

    static hasClassProps(props) {
        return CircularThumbnaill.CLASS_PROPS.some(elem => elem in props)
    }

    static hasComponentData(props) {
        return CircularThumbnaill.DATA_PROPS.some(elem => elem in props)
    }

    constructor(props) {
        super(props);
        this.state = {}
        this.usingDefaultClass = !CircularThumbnaill.hasClassProps(props);
        this.usingDefaultData = !CircularThumbnaill.hasComponentData(props);

        this.className = '';
        this.classImage = '';
        this.classTitle = '';
        this.classGrid = '';
        this.classElements = '';

        this.classHover = '';
        this.classImageHover = '';
        this.classTitleHover = '';

        this.thumbnail = React.createRef();
        this.image = React.createRef();
        this.title = React.createRef();

        this.onmouseenter = this.onMouseEnter.bind(this);
        this.onmouseleave = this.onMouseLeave.bind(this);
        this.onmouseenterimage = this.onMouseEnterImage.bind(this);
        this.onmouseleaveimage = this.onMouseLeaveImage.bind(this);

        this.#assignClassNames(props);
    }

    #assignClassNames(props) {
        if (!this.usingDefaultClass) {
            this.classImage = props.classImage || '';
            this.classTitle = props.classTitle || '';
        } else {
            this.#titleStyle = {...this.#titleStyle, ...defaultTitleStyle};
            this.#imageStyle = {...this.#imageStyle, ...defaultImageStyle};
        }

        this.className = props.className || '';
        this.classGrid = props.classGrid || '';
        this.classElements = props.classElements || '';

        this.classHover = props.classHover || '';
        this.classImageHover = props.classImageHover || '';
        this.classTitleHover = props.classTitleHover || '';
    }

    onMouseEnter(e) {
        if (!this.classHover) return;

        this.thumbnail.current.classList.toggle(this.classHover);
        if (this.classImageHover) {
            this.image.current.classList.toggle(this.classImageHover);
        }
        if (this.classTitleHover)
            this.title.current.classList.toggle(this.classTitleHover);
    }

    onMouseLeave(e) {
        if (!this.classHover) return;

        this.thumbnail.current.classList.toggle(this.classHover);
        if (this.classImageHover)
            this.image.current.classList.toggle(this.classImageHover);
        if (this.classTitleHover)
            this.title.current.classList.toggle(this.classTitleHover);
    }

    onMouseEnterImage(e) {
        if (!this.classImageHover) return;
        if (!this.image.current.classList.contains(this.classImageHover))
            this.image.current.classList.toggle(this.classImageHover);
    }

    onMouseLeaveImage(e) {
        if (!this.classImageHover) return;
        if (this.image.current.classList.contains(this.classImageHover))
            this.image.current.classList.toggle(this.classImageHover);
    }

    resize(title) {
        if (title && title.length > 17) {
            return `${title.slice(0, 17)}...`
        }
        return title;
    }

    render() {
        let image = this.usingDefaultData ? defaultThumbnail.imageUrl : this.props.image;
        let link = this.usingDefaultData ? defaultThumbnail.link : this.props.link;
        let title = this.usingDefaultData ? defaultThumbnail.title : this.props.title;

        let areas = ['image', 'image', 'image', 'image', 'title']
        let components = {
            'image': <div className={this.classImage} style={this.#imageStyle} ref={this.image}>
                <img alt="img" src={image}
                     style={{borderRadius: "50%", width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>,
            'title': <label className={this.classTitle} ref={this.title} style={this.#titleStyle}>{this.resize(title)}</label>
        }
        return <Link to={link} onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} style={{textDecoration: "inherit", color: "inherit"}}>
            <GridLayout
                className={this.className}
                classElements={this.classElements}
                areas={areas}
                components={components} refGridLayout={this.thumbnail}/>
        </Link>
    }
}

class CircularThumbnail extends React.Component {
    render() {
        return <CircularThumbnaill
            className="thumbnail"
            classTitle="thumbnail-title"
            classElements="thumbnail-elements"
            classHover="thumbnail-hover"
            classTitleHover="thumbnail-title-hover"
            classImageHover="thumbnail-image-hover"/>
    }
}

export default CircularThumbnail