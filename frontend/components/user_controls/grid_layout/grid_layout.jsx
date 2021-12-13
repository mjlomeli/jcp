import React from 'react';
import './grid_layout.css'

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

    /** Everything must be direct prop passing to keep event
     * driven functionality.
     * @param props
     */
    constructor(props) {
        super(props);
        if (props.areas && props.components) {
            this.className = `global-gridlayout-grid ${props.classGrid || ""}`;
            this.classItems = `global-gridlayout-items ${props.classItems || ""}`;
        } else {
            this.className = `global-gridlayout-grid global-default-gridlayout-grid`;
            this.classItems = `global-gridlayout-items global-default-gridlayout-items`;
        }

        this.onmouseenter = props.onMouseEnter || null;
        this.onmouseleave = props.onMouseLeave || null;
        this.onclick = props.onClick || null;
    }

    render() {
        // fixed gallery layout. found out
        // Everything must be direct prop passing to keep event driven functionality.
        // Any component assigned to `this` or `state` will no longer have visible actions.
        let areaNames = this.props.areas || defaultArea;
        let components = this.props.components || defaultComponents;
        let areas = areaNames.map(r => `'${r}'`)
        let style = {gridTemplateAreas: areas.join(' ')}
        return <>
            <div onMouseEnter={this.onmouseenter}
                 onMouseLeave={this.onmouseleave}
                 onClick={this.onclick}
                 className={this.className}
                 style={style}>{
                     Object.entries(components).map(
                         (obj, i) => {
                             let [key, value] = obj;
                             return <div key={i} className={this.classItems} style={{gridArea: `${key}`}}>{value}</div>
                         })
            }</div>
        </>
    }
}

export default GridLayout;
