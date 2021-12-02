import {connect} from 'react-redux';
import {v4 as uuidv4} from "uuid";
import React from 'react';
import './gallery.css'
import GridLayout from "../grid_layout/grid_layout";
import {fetchUserControl, updateUserControl} from "../../../actions/ui_user_control_actions";


const mapStateToProps = (state, ownProps) => {
    let userControl = state.ui.userControl.gallery;
    let galleryId = (ownProps.match && ownProps.match.params.id) || ownProps.galleryId;
    let gallery = (galleryId && userControl[galleryId]) || null;
    let component = gallery && gallery.component || null;
    let images = gallery && gallery.images || null;
    let carousel = gallery && gallery.carousel || null;


    return {
        //errors: errors.session, // need to add a ui or user_control errors
        galleryId: galleryId,
        gallery: gallery,
        component: component,
        reducer: "gallery",
        images: images,
        carousel: carousel
    }
};

const mapDispatchToProps = (dispatch, ownProp) => {
    return {
        fetchUserControl: (reducer, id) => dispatch(fetchUserControl(reducer, id)),
        updateUserControl: (reducer, id, ui) => dispatch(updateUserControl(reducer, id, ui))
    }
};


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
    static REDUCER = "gallery";
    constructor(props) {
        super(props);
        this.state = {
            carousel: props.carousel || defaultGallery.galleryImage,
            images: props.images || defaultGallery.images,
            lowerImage: defaultGallery.galleryImage,
            index: 0,
            components: {
                'carousel':<img className="gallery-carousel" src={defaultGallery.galleryImage} alt="carousel" />,
                '0': <img onClick={() => this.setImage(0)} src={defaultGallery.images[0]} alt="img"/>,
                '1': <img onClick={() => this.setImage(1)} src={defaultGallery.images[1]} alt="img"/>,
                '2': <img onClick={() => this.setImage(2)} src={defaultGallery.images[2]} alt="img"/>,
                '3': <img onClick={() => this.setImage(3)} src={defaultGallery.images[3]} alt="img"/>
            },
            component: props.component
        }
        this.id = this.props.galleryId || this.props.match && this.props.match.params.id;
    }

    isValid(){
        return this.props.component ||
            this.id && this.props.fetchUserControl(Gallery.REDUCER, this.id) ||
            this.state.ui || false;
    }

    resolve() {
        let areas = [
            "image0 carousel carousel carousel",
            "image1 carousel carousel carousel",
            "image2 carousel carousel carousel",
            "image3 carousel carousel carousel",
        ];

        let components = {
            'carousel':<img className="gallery-carousel" src={this.state.carousel} alt="carousel" />,
            'image0': <img onClick={() => this.setImage(0)} src={defaultGallery.images[0]} alt="img"/>,
            'image1': <img onClick={() => this.setImage(1)} src={defaultGallery.images[1]} alt="img"/>,
            'image2': <img onClick={() => this.setImage(2)} src={defaultGallery.images[2]} alt="img"/>,
            'image3': <img onClick={() => this.setImage(3)} src={defaultGallery.images[3]} alt="img"/>
        }

        this.props.updateUserControl(GridLayout.REDUCER, this.id, {areas: areas, components: components});

        let gallery = <div>
            <GridLayout gridLayoutId={this.props.galleryId}
                        classGrid="gallery-grid"
                        classItems="gallery-items"/>
            {this.state.components['carousel']}
        </div>

        this.props.updateUserControl(Gallery.REDUCER, this.id,
            {component: gallery, carousel: this.state.carousel, images: this.state.images})
        return null;
    }

    setImage(index, e) {
        let components = this.state.components;
        components['carousel'] = this.state.components[index]
        this.setState({carousel: this.state.images[index], components, lowerImage: this.state.images[index]})
    }

    render() {
        if (!this.isValid())
            return this.resolve();

        return this.props.fetchUserControl(Gallery.REDUCER, this.id).component ||
            this.props.component || null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)