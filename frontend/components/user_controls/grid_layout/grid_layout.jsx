import React from 'react';

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
    components.title = <h2>Default Grid Layout</h2>
    components.description = <label>
        This is the default grid layout. If you're seeing this its because no components or
        areas were provided. You must provide a component and areas prop. Read more about it
        in the examples provided in the grid_layout.md in the directory of this component.
    </label>
    layout4x5 = ['title title title title', 'description description description description'].concat(layout4x5);
    return [layout4x5, components]
}
const [defaultArea, defaultComponents] = defaultGrid();
const defaultGridStyle = {
    display: 'inline-grid',
    backgroundColor: '#2196F3',
    width: 'inherit',
    height: 'inherit'
};

const defaultElementsStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    fontSize: '2em',
    textAlign: 'center'
};


class GridLayout extends React.Component {
    #gridStyle = {display: 'grid'};
    #itemsStyle = {};

    /** Everything must be direct prop passing to keep event
     * driven functionality.
     * @param props
     */
    constructor(props) {
        super(props);
        this.refGridLayout = props.refGridLayout;
        this.className = '';
        this.classElements = '';

        this.#assignClassNames(props);
        this.#assignAreas(props);

        this.onmouseenter = props.onMouseEnter || null;
        this.onmouseleave = props.onMouseLeave || null;
        this.onclick = props.onClick || null;
    }

    #assignClassNames(props){
        if (props.areas && props.components) {
            this.className = props.className || null;
            this.classElements = props.classElements || null;
        } else {
            this.#gridStyle = {...this.#gridStyle, ...defaultGridStyle};
            this.#itemsStyle = {...this.#itemsStyle, ...defaultElementsStyle};
            console.warn("Default GridLayout is used");
        }
    }

    #assignAreas(props){
        let areaNames = (props.areas || defaultArea);
        let areas = areaNames.map(r => `'${r}'`)
        this.#gridStyle.gridTemplateAreas = areas.join(' ')
    }

    #makeElements(components){
        return Object.entries(components).map(
            (obj, i) => {
                let [key, value] = obj;
                return <div key={key.toString()}
                            className={this.classElements}
                            style={{...this.#itemsStyle, gridArea: `${key}`}}>{value}</div>
            })
    }

    render() {
        // Everything must be direct prop passing to keep event driven functionality.
        // Any component assigned to `this` or `state` will no longer have visible actions.
        let components = this.props.components || defaultComponents;
        return <>
            <div onMouseEnter={this.onmouseenter}
                 onMouseLeave={this.onmouseleave}
                 onClick={this.onclick}
                 className={this.className}
                 style={this.#gridStyle} ref={this.refGridLayout}>{
                     this.#makeElements(components)
            }</div>
        </>
    }
}

export default GridLayout;
