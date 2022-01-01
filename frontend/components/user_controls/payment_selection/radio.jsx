import React from "react";
import "./radio.css"
import GridLayout from "../grid_layout/grid_layout";

class Selection extends React.Component {

    constructor(props) {
        super(props);
        this.className = props.className || '';
        this.classElements = props.classElements || '';

        this.name = props.name || null;
        this.value = props.value;
        this.checked = props.checked || null;
    }

    render() {
        let radio = <label className="container">
            <input className="radio-input" type="radio" name={this.name} value={this.value} checked={this.checked}/>
            <span className="checkmark"/>
            <br />
        </label>

        let areas = ['radio components components components']
        let components = {
            'radio': radio,
            'components': this.props.components || null
        }

        return <GridLayout areas={areas} components={components} className={this.className} classElements={this.classElements}/>
    }
}

export default Selection;