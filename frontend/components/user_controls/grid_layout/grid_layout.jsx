import React from 'react';
import './grid_layout.css'
// <div className="grid-container" style={{gridTemplateAreas: "'header header header header header header' 'menu main main main right right' 'menu footer footer footer footer footer'"}}>
//                                       {"gridTemplateAreas":"'header header header header header header' 'menu main main main right right' 'menu footer footer footer footer footer'"}
// style={`grid-area: ${key}`}
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
