import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import React from 'react';
import './navbar.css'
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
    static PROPS = ['className', 'headerClass', 'dropperClass', 'linksClass', 'hoverClass', 'headerHoverClass', 'linksHoverClass'];
    #style = {};
    #linksStyle = {};

    static isDefault(props) {
        return !DropdownLayout.PROPS.some(elem => elem in props)
    }

    constructor(props) {
        super(props);
        this.state = {headerStyle: {}, dropperStyle: {}}
        this.default = DropdownLayout.isDefault(props)

        this.className = '';
        this.headerClass = '';
        this.dropperClass = '';
        this.linksClass = '';

        this.hoverClass = '';
        this.headerHoverClass = '';
        this.linksHoverClass = '';

        this.header = React.createRef();
        this.dropper = React.createRef();

        this.onmouseenter = this.onMouseEnter.bind(this);
        this.onmouseleave = this.onMouseLeave.bind(this);
        this.onmouseenterlink = this.onMouseEnterLink.bind(this);
        this.onmouseleavelink = this.onMouseLeaveLink.bind(this);


        this.#assignClassNames(props)
    }

    onMouseEnter(e) {
        if (!this.default) {
            this.header.current.classList.toggle(this.headerHoverClass);
            this.dropper.current.style.display = "block";
        } else {
            let headerStyle = {...this.state.headerStyle, ...{backgroundColor: "red"}}
            let dropperStyle = {...this.state.dropperStyle, ...{display: "block"}}
            this.setState({headerStyle, dropperStyle})
        }
    }

    onMouseLeave(e) {
        if (!this.default) {
            this.header.current.classList.toggle(this.headerHoverClass);
            this.dropper.current.style.display = "none";
        } else {
            let headerStyle = {...this.state.headerStyle, ...{backgroundColor: ""}}
            let dropperStyle = {...this.state.dropperStyle, ...{display: "none"}}
            this.setState({headerStyle, dropperStyle})
        }
    }

    onMouseEnterLink(e) {
        if (!this.default)
            e.currentTarget.classList.toggle(this.linksHoverClass)
        else {
            e.currentTarget.style.backgroundColor = "#ddd";
        }
    }

    onMouseLeaveLink(e) {
        if (!this.default)
            e.currentTarget.classList.toggle(this.linksHoverClass)
        else
            e.currentTarget.style.backgroundColor = "";
    }

    #assignClassNames(props) {
        if (!this.default) {
            this.className = props.className || '';
            this.headerClass = props.headerClass || '';
            this.dropperClass = props.dropperClass || '';
            this.linksClass = props.linksClass || '';

            this.hoverClass = props.hoverClass || '';
            this.headerHoverClass = props.headerHoverClass || '';
            this.linksHoverClass = props.linksHoverClass || '';
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
            <Link className={`${this.linksClass}`} to={`${url}`} style={this.#linksStyle}
                  onMouseEnter={this.onmouseenterlink} onMouseLeave={this.onmouseleavelink}>
                {`${name}`}
            </Link>
        </>
    }

    asText(header){
        return <label className={this.linksClass} style={this.#linksStyle}>
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

    render() {
        let components = this.props.components || defaultDropDown.components;
        let header = this.props.header || defaultDropDown.header;
        let link = this.props.link || defaultDropDown.link;

        let dropdowns;
        if (Array.isArray(components))
            dropdowns = this.arrayDropDown(components);
        else if (typeof components === 'string' || components instanceof String)
            dropdowns = this.asText(components);
        else if (!components)
            dropdowns = null;
        else
            dropdowns = this.objectDropDown(components);

        return <>
            <div className={`${this.className}`} style={this.#style}
                 onMouseEnter={this.onmouseenter}
                 onMouseLeave={this.onmouseleave}>
                <Link className={this.headerClass} to={link} style={this.state.headerStyle} ref={this.header}>
                    {header}
                </Link>
                <div className={this.dropperClass} style={this.state.dropperStyle} ref={this.dropper}>
                    {dropdowns}
                </div>
            </div>
        </>
    }
}
