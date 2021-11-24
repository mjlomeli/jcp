import React from 'react';
import './grid_layout.css'


class GridLayout extends React.Component {
    constructor(props) {
        super(props);

        let areas = this.props.gridTemplateAreas.map(r => `'${r}'`)
        this.style = {gridTemplateAreas: areas.join(' ')}
        this.components = props.components;

        this.gridClass = `gridlayout-container ${props.gridClass || ""}`
        this.itemClass = `gridlayout-item ${props.itemClass || ""}`
    }

    render() {
        return <>
            <div className={this.gridClass} style={this.style}>{
                Object.entries(this.components).map(
                    (obj, i) => {
                        let [key, value] = obj;
                        return <div className={this.itemClass} style={{gridArea: `${key}`}} key={i}>{value}</div>
                    })
            }</div>
        </>
    }
}

export default GridLayout;
