import {connect} from 'react-redux';
import React from 'react';
import './gallery.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

let defaultGallery = {
    carousel: "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
    gallery: ["https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
        "https://i.etsystatic.com/21035245/r/il/5fc9a7/2038971731/il_794xN.2038971731_8ffn.jpg",
        "https://i.etsystatic.com/21035245/r/il/477ace/2038972099/il_794xN.2038972099_8k6b.jpg",
        "https://i.etsystatic.com/21035245/r/il/22765d/1991411394/il_794xN.1991411394_1nzf.jpg"]
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...defaultGallery, index: 0}
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    componentDidMount() {
        if (this.props.gallery)
            this.setState({gallery: this.props.gallery, carousel: this.props.carousel})
    }

    onClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setState({carousel: this.state.gallery[index]})
    }

    leftClick() {
        let newIndex = this.state.index <= 1 ? this.state.gallery.length - 1 : this.state.index - 1;
        this.setState({carousel: this.state.gallery[newIndex], index: newIndex})
    }

    rightClick() {
        let newIndex = this.state.index >= this.state.gallery.length - 1 ? 0 : this.state.index + 1;
        this.setState({carousel: this.state.gallery[newIndex], index: newIndex})
    }

    imageSelections(index) {
        return <img onClick={this.onClick.bind(this)} src={this.state.gallery[index]} alt="img" data-index={index}/>
    }

    buttonLeft() {
        return <svg className="gallery-button gallery-button-left"
                    onClick={() => this.leftClick()}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M16,21a0.994,0.994,0,0,1-.664-0.253L5.5,12l9.841-8.747a1,1,0,0,1,1.328,1.494L8.5,12l8.159,7.253A1,1,0,0,1,16,21Z"></path>
        </svg>
    }

    buttonRight() {
        return <svg className="gallery-button gallery-button-right"
                    onClick={() => this.rightClick()}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M8,21a1,1,0,0,1-.664-1.747L15.5,12,7.336,4.747A1,1,0,0,1,8.664,3.253L18.5,12,8.664,20.747A0.994,0.994,0,0,1,8,21Z"></path>
        </svg>
    }

    gallery() {
        return <>
            {this.buttonLeft()}
            <img id="gallery-image" className="gallery-carousel" src={this.state.carousel} alt="img"/>
            {this.buttonRight()}
        </>
    }

    render() {
        if (!this.state.gallery)
            return null;

        let areas = [];
        let components = {'carousel': this.gallery()}
        for (let i = 0; i < this.state.gallery.length; i++) {
            let row = [`image${i}`].concat(Array(this.state.gallery.length - 1).fill('carousel'));
            areas.push(row.join(" "));
            components[`image${i}`] = this.imageSelections(i);
        }

        return <GridLayout areas={areas}
                           components={components}
                           className="gallery-grid"
                           classItems="gallery-items" />
    }
}

export default Gallery