import React from 'react';
import './grid_layout.css'
import {v4 as uuidv4} from "uuid";

class GridLayout extends React.Component {
    constructor(props) {
        super(props);

        let areas = this.props.areas.map(r => `'${r}'`)
        this.style = {gridTemplateAreas: areas.join(' ')}
        this.components = props.components;

        this.gridClass = `global-gridlayout-container ${props.gridClass || ""}`
        this.itemClass = `global-gridlayout-item ${props.itemClass || ""}`

        this.onmouseenter = props.onMouseEnter;
        this.onmouseleave = props.onMouseLeave;
        this.onclick = props.onClick;
    }

    render() {
        return <>
            <div onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} onClick={this.onclick}
                 className={this.gridClass} style={this.style}>{
                Object.entries(this.components).map(
                    (obj, i) => {
                        let [key, value] = obj;
                        return <div key={uuidv4()} className={this.itemClass} style={{gridArea: `${key}`}}>{value}</div>
                    })
            }</div>
        </>
    }
}

export default GridLayout;
