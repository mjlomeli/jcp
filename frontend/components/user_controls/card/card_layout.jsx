import {connect} from 'react-redux';
import React from 'react';
import './card_layout.css'

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "listing_card"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {}
});


class CardLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            front: props.front,
            frontFlip: "",
            back: props.back,
            backFlip: "flip",
            cursor: ""
        }
        this.onclick = props.onClick || this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
        this.flip();
    }

    flip() {
        let front = (this.state.frontFlip) ? "" : "flip";
        let back = (this.state.backFlip) ? "" : "flip";
        this.setState({frontFlip: front, backFlip: back})
    }

    isFlippedUp(){
        return this.state.frontFlip === "";
    }

    isFlippedDown(){
        return this.state.backFlip === "";
    }

    flipUp(){
        if (this.isFlippedDown())
            this.flip()
    }

    flipDown(){
        if (this.isFlippedUp())
            this.flip()
    }

    cursorDefault(){
        this.setState({cursor: "cursor-default"})
    }

    cursorGrab(){
        this.setState({cursor: "cursor-grab"})
    }

    cursorPointLoading(){
        this.setState({cursor: "cursor-pointing-loading"})
    }

    cursorLoading(){
        this.setState({cursor: "cursor-loading"})
    }

    enableFlippingOnClick(){
        this.onclick = this.onClick.bind(this);
    }

    disableFlippingOnClick(){
        this.onclick = null;
    }

    renderErrors() {
        console.log(this.props.errors);
        return <ul>{
            this.props.errors.map(
                // TODO: load an error or faded notification instead
                (error, i) => <li key={`error-${i}`}> {error} </li>
            )
        }</ul>
    }

    render() {
        return <>
            <div className={`card ${this.state.cursor}`} onClick={this.onclick}>
                <div className={`card-side front ${this.state.frontFlip}`}>
                    {this.state.front}
                </div>
                <div className={`card-side back ${this.state.backFlip}`}>
                    {this.state.back}
                </div>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardLayout);