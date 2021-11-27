import {connect} from 'react-redux';
import React from 'react';
import './circular_thumbnail.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class CircularThumbnail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Baby Puzzles",
            imageUrl: "https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg"
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    resize(category){
        if (category.length > 17) {
            return `${category.slice(0, 17)}...`
        }
        return category;
    }

    componentDidMount() {
        // TODO: make sure title is resized
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
    }

    onMouseEnter(e) {
        let element = e.currentTarget
        if (element.classList.contains("circular-thumbnail-mouse-leave")) {
            e.currentTarget.classList.replace('circular-thumbnail-mouse-leave','circular-thumbnail-mouse-enter')
        }
    }

    onMouseLeave(e){
        let element = e.currentTarget
        if (element.classList.contains("circular-thumbnail-mouse-enter")) {
            element.classList.replace('circular-thumbnail-mouse-enter','circular-thumbnail-mouse-leave')
        }
    }

    render() {
        let areas = ['image', 'title']
        let components = {
            'image': <div className="circular-thumbnail-image-div">
                <img className="circular-thumbnail-image" alt="img" aria-hidden="true" src={this.state.imageUrl}/>
            </div>,
            'title': <label id="circular-title" className="circular-thumbnail-category">{this.resize(this.state.category)}</label>
        }
        return <>
            <GridLayout
                gridClass="circular-thumbnail-listing"
                itemClass="circular-thumbnail-items"
                areas={areas}
                components={components}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}/>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircularThumbnail);