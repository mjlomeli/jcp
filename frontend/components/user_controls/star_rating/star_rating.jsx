import React from "react";
import {connect} from 'react-redux';
import './star_rating.css'

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "star_rating"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class StarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rating: "4", count: 31909, disabled: false}

        this.onchange = this.onChange.bind(this);
    }

    onChange(e){
        if (this.state.disabled)
            return;
        let value = e.currentTarget.value;
        this.setState({rating: value});
    }

    rating(value){
        let val = value.toString();
        let checked = this.state.rating === val;
        let labelClassName = `global-star-rating-label global-star-rating-label-${val}`
        let inputClassName = `global-star-rating-input global-star-rating-input-${val}`
        return <>
            <input className={inputClassName} type="radio" id={`${val}-stars`}
                   name="rating" value={`${val}`} checked={checked} onChange={this.onchange}/>
            <label className={labelClassName} htmlFor={`${val}-stars`}>&#9733;</label>
        </>
    }

    render() {
        let hoverEffects = (this.state.disabled) ? "global-star-rating" : "global-star-rating-hover"
        return <>
            <div className={`global-star-rating ${hoverEffects}`}>
                <div className="global-star-rating-stars">
                    {this.rating(5)}
                    {this.rating(4)}
                    {this.rating(3)}
                    {this.rating(2)}
                    {this.rating(1)}
                </div>
                &nbsp;
                <label className="global-star-rating-count">({this.state.count.toLocaleString()})</label>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StarRating);