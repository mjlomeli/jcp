import {connect} from 'react-redux';
import {v4 as uuidv4} from "uuid";
import React from 'react';
import './gallery.css'
import GridLayout from "../grid_layout/grid_layout";

let defaultGallery = {
    images: [
        "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
        "https://i.etsystatic.com/21035245/r/il/5fc9a7/2038971731/il_794xN.2038971731_8ffn.jpg",
        "https://i.etsystatic.com/21035245/r/il/477ace/2038972099/il_794xN.2038972099_8k6b.jpg",
        "https://i.etsystatic.com/21035245/r/il/22765d/1991411394/il_794xN.1991411394_1nzf.jpg"],
    galleryImage: "https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg",
    galleryIndex: 0
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {images: [], galleryImage: null, galleryIndex: 0}
    }

    componentDidMount() {
        if (this.props.images)
            this.setState({images: [...this.props.images], galleryImage: this.props.images[0], galleryIndex: 0, img: <img id="gallery-image" className="gallery-carousel" src="https://i.etsystatic.com/21035245/r/il/39a4e2/2038971261/il_794xN.2038971261_9zrx.jpg" alt="img"/>})
        else
            this.setState({...defaultGallery});
    }

    setImage(index) {
        this.setState({galleryImage: this.state.images[index], galleryIndex: index});
    }

    render() {
        if (!this.state.images || !this.state.images.length)
            return null;

        let areas = [
            "image0 carousel carousel carousel",
            "image1 carousel carousel carousel",
            "image2 carousel carousel carousel",
            "image3 carousel carousel carousel",
        ];
        let components = {
            'carousel': <img className="gallery-carousel" src={this.state.galleryImage} alt="image"/>,
            'image0': <img onClick={() => this.setImage(0)} src={this.state.images[0]} alt="img"/>,
            'image1': <img onClick={() => this.setImage(1)} src={this.state.images[1]} alt="img"/>,
            'image2': <img onClick={() => this.setImage(2)} src={this.state.images[2]} alt="img"/>,
            'image3': <img onClick={() => this.setImage(3)} src={this.state.images[3]} alt="img"/>
        }

        return <div>
            <GridLayout areas={areas} components={components} classGrid="gallery-grid" classItems="gallery-items"/>
            <br />
            <img className="gallery-carousel" src={this.state.galleryImage} alt="image"/>
        </div>
    }
}

export default Gallery