import React from 'react';
import './grid_layout.css'
import {v4 as uuidv4} from "uuid";

let defaultGrid = () => {
    let layout4x5 = [];
    let components = {};
    let idx = 0;
    for (let i = 0; i < 5; i++) {
        let s = [];
        for (let j = 0; j < 4; j++) {
            let comp = `item${idx + 1}`
            s.push(comp);
            components[comp] = <label>Row_{i}, Col_{j}</label>;
            idx++;
        }
        layout4x5.push(s.join(" "));
    }
    return [layout4x5, components]
}

let [defaultArea, defaultComponents] = defaultGrid();

class GridLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            areas: props.areas || defaultArea,
            components: props.components || defaultComponents
        }
        if (props.areas && props.components) {
            this.classGrid = `global-gridlayout-grid ${props.classGrid || ""}`;
            this.classItems = `global-gridlayout-items ${props.classItems || ""}`;
        } else {
            this.classGrid = `global-gridlayout-grid global-default-gridlayout-grid`;
            this.classItems = `global-gridlayout-items global-default-gridlayout-items`;
        }

        console.log(`classGrid: ${this.classGrid}`);
        console.log(`classItems: ${this.classItems}`);
        this.onmouseenter = props.onMouseEnter;
        this.onmouseleave = props.onMouseLeave;
        this.onclick = props.onClick;
    }

    render() {
        let areas = this.state.areas.map(r => `'${r}'`)
        let style = {gridTemplateAreas: areas.join(' ')}
        return <>
            <div onMouseEnter={this.onmouseenter} onMouseLeave={this.onmouseleave} onClick={this.onclick}
                 className={this.classGrid} style={style}>{
                Object.entries(this.state.components).map(
                    (obj, i) => {
                        let [key, value] = obj;
                        return <div key={uuidv4()} className={this.classItems} style={{gridArea: `${key}`}}>{value}</div>
                    })
            }</div>
        </>
    }
}

export default GridLayout;
