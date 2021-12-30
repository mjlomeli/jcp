import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import React from 'react';
import '../../themes/header_template/navbar.css'
import {isHTML} from '../../../utils/component_utils'


const defaultDropDown = {
    header: "Header",
    link: "#",
    components: {
        "Drop 1": "#",
        "Drop 2": "#",
        "Drop 3": "#"
    }
}

export class DropdownLayout extends React.Component {
    static CLASS_PROPS = ['className', 'classHeader', 'classDropper', 'classLinks', 'classHover', 'classHeaderHover', 'classLinksHover'];
    static DATA_PROPS = ['header', 'link', 'components'];
    #style = {};
    #linksStyle = {};

    static hasClassProps(props) {
        return DropdownLayout.CLASS_PROPS.some(elem => elem in props)
    }
    static hasComponentData(props) {
        return DropdownLayout.DATA_PROPS.some(elem => elem in props)
    }

    constructor(props) {
        super(props);
        this.state = {headerStyle: {}, dropperStyle: {}}
        this.usingDefaultClass = !DropdownLayout.hasClassProps(props);
        this.usingDefaultData = !DropdownLayout.hasComponentData(props);

        this.className = '';
        this.classHeader = '';
        this.classDropper = '';
        this.classLinks = '';

        this.classHover = '';
        this.classHeaderHover = '';
        this.classLinksHover = '';

        this.header = React.createRef();
        this.dropper = React.createRef();

        this.onmouseenter = this.onMouseEnter.bind(this);
        this.onmouseleave = this.onMouseLeave.bind(this);
        this.onmouseenterlink = this.onMouseEnterLink.bind(this);
        this.onmouseleavelink = this.onMouseLeaveLink.bind(this);

        this.#assignClassNames(props)
    }

    onMouseEnter(e) {
        if (!this.usingDefaultClass && !this.classHeaderHover) return;

        if (this.usingDefaultClass) {
            let headerStyle = {...this.state.headerStyle, ...{backgroundColor: "red"}}
            let dropperStyle = {...this.state.dropperStyle, ...{display: "block"}}
            this.setState({headerStyle, dropperStyle})
        } else {
            this.header.current.classList.toggle(this.classHeaderHover);
            this.dropper.current.style.display = "block";
        }
    }

    onMouseLeave(e) {
        if (!this.usingDefaultClass && !this.classHeaderHover) return;

        if (this.usingDefaultClass) {
            let headerStyle = {...this.state.headerStyle, ...{backgroundColor: ""}}
            let dropperStyle = {...this.state.dropperStyle, ...{display: "none"}}
            this.setState({headerStyle, dropperStyle})
        } else {
            this.header.current.classList.toggle(this.classHeaderHover);
            this.dropper.current.style.display = "none";
        }
    }

    onMouseEnterLink(e) {
        if (!this.usingDefaultClass && !this.classLinksHover) return;

        if (this.usingDefaultClass)
            e.currentTarget.style.backgroundColor = "#ddd";
        else
            e.currentTarget.classList.toggle(this.classLinksHover)
    }

    onMouseLeaveLink(e) {
        if (!this.usingDefaultClass && !this.classLinksHover) return;

        if (this.usingDefaultClass)
            e.currentTarget.style.backgroundColor = "";
        else
            e.currentTarget.classList.toggle(this.classLinksHover)
    }

    #assignClassNames(props) {
        if (!this.usingDefaultClass) {
            this.className = props.className || '';
            this.classHeader = props.classHeader || '';
            this.classDropper = props.classDropper || '';
            this.classLinks = props.classLinks || '';

            this.classHover = props.classHover || '';
            this.classHeaderHover = props.classHeaderHover || '';
            this.classLinksHover = props.classLinksHover || '';
        } else {
            this.#defaultStyles();
        }
    }

    #defaultStyles() {
        this.#style = {float: "left", overflow: "hidden"}
        this.#linksStyle = {
            float: "none",
            color: "black",
            padding: "12px 16px",
            textDecoration: "none",
            display: "block",
            textAlign: "left"
        };
        let headerStyle = {
            float: "none",
            color: "black",
            padding: "12px 16px",
            textDecoration: "none",
            display: "block",
            textAlign: "left",
            cursor: "pointer"
        };
        let dropperStyle = {
            display: "none",
            position: "absolute",
            backgroundColor: "#f9f9f9",
            minWidth: "160px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: "1"
        };
        this.state = {headerStyle, dropperStyle};
    }

    asLinks(pair) {
        let [name, url] = pair;
        return <>
            <Link className={`${this.classLinks}`} to={`${url}`} style={this.#linksStyle}
                  onMouseEnter={this.onmouseenterlink} onMouseLeave={this.onmouseleavelink}>
                {`${name}`}
            </Link>
        </>
    }

    asText(header){
        return <label className={this.classLinks} style={this.#linksStyle}>
            {header}
        </label>
    }

    objectDropDown(components) {
        return Object.entries(components).map(
            (pair, idx) => {
                let [key, value] = pair;
                if (isHTML(value))
                    return <React.Fragment key={idx}>{value}</React.Fragment>
                else if (typeof value === 'string' || value instanceof String) {
                    return <React.Fragment key={idx}>{this.asLinks(pair)}</React.Fragment>
                } else
                    return null;
            })
    }

    arrayDropDown(components) {
        return components.map((component, idx) => {
            if (typeof value === 'string' || value instanceof String)
                return <React.Fragment key={idx}>{this.asText(component)}</React.Fragment>
            else
                return <React.Fragment key={idx}>{component}</React.Fragment>
        })
    }

    componentHeader(){
        let header = !this.usingDefaultData ? this.props.header : defaultDropDown.header;
        let link = !this.usingDefaultData ? this.props.link : defaultDropDown.link;

        return <Link className={this.classHeader} to={link} style={this.state.headerStyle} ref={this.header}>
            {header}
        </Link>
    }

    componentDropper(){
        let components = !this.usingDefaultData ? this.props.components : defaultDropDown.components;

        let dropdowns;
        if (Array.isArray(components))
            dropdowns = this.arrayDropDown(components);
        else if (typeof components === 'string' || components instanceof String)
            dropdowns = this.asText(components);
        else if (!components)
            dropdowns = null;
        else
            dropdowns = this.objectDropDown(components);

        return !dropdowns ? null : <div className={this.classDropper} style={this.state.dropperStyle} ref={this.dropper}>
            {dropdowns}
        </div>
    }

    render() {

        return <>
            <div className={`${this.className}`} style={this.#style}
                 onMouseEnter={this.onmouseenter}
                 onMouseLeave={this.onmouseleave}>
                {this.componentHeader()}
                {this.componentDropper()}
            </div>
        </>
    }
}
