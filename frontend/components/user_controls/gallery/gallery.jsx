import {connect} from 'react-redux';
import React from 'react';
import './gallery.css'
import GridLayout from "../grid_layout/grid_layout";

let defaultGallery = {
    carousel: "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
    image1: "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
    image2: "https://i.etsystatic.com/21035245/r/il/5fc9a7/2038971731/il_794xN.2038971731_8ffn.jpg",
    image3: "https://i.etsystatic.com/21035245/r/il/477ace/2038972099/il_794xN.2038972099_8k6b.jpg",
    image4: "https://i.etsystatic.com/21035245/r/il/22765d/1991411394/il_794xN.1991411394_1nzf.jpg",
    imageIndex: 1,
    length: 4
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    componentDidMount() {
        console.log("entered")
        if (!this.props.gallery)
            this.setState({gallery: defaultGallery});
        else
            this.setState({gallery: this.props.gallery})
    }

    onClick(e) {
        e.preventDefault();
        let index = parseInt(e.currentTarget.dataset.index);
        this.setState({imageIndex: index});
    }

    leftClick() {
        let gallery = this.state.gallery;
        let imageIndex = gallery.imageIndex <= 1 ? gallery.length : gallery.imageIndex - 1;
        let carousel = gallery[`image${imageIndex}`];
        this.setState({imageIndex, carousel})
    }

    rightClick() {
        let gallery = this.state.gallery;
        let imageIndex = gallery.imageIndex <= 1 ? gallery.length : gallery.imageIndex - 1;
        let carousel = gallery[`image${imageIndex}`];
        this.setState({imageIndex, carousel})
    }

    generateImage(index){
        return <img src={this.state.gallery[`image${index}`]} alt="img" data-index={index}/>
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
            <img id="gallery-image" className="gallery-carousel" src={this.state.gallery.carousel} alt="img"/>
            {this.buttonRight()}
        </>
    }

    render() {
        console.log("render")
        if (!this.state.gallery)
            return null;

        console.log("pass")
        let areas = [];
        let components = {'carousel': this.gallery(),}
        console.log(this.state)
        for (let i = 0; i < this.state.gallery.length; i++){
            let row = [`image${i+1}`].concat(Array(this.state.gallery.length-1).fill('carousel'));
            areas.push(row.join(" "));
            components[i+1] = this.generateImage(i+1);
        }

        return <GridLayout areas={areas}
                           components={components}
                           classGrid="gallery-grid"
                           classItems="gallery-items"/>
    }
}

export default Gallery