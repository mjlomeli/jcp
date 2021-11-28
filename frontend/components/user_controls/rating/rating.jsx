import React from "react";
import {connect} from 'react-redux';
import './rating.css'
import {v4 as uuidv4} from 'uuid';

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "rating"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

const defaultIcon = {
    path: "m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z",
        viewBox: "0 0 50 48"
}

class Star {
    static fillColor = "#222";
    static highlightColor = "#fc0"
    static strokeColor = "rgba(0,0,0,0)";
    static icon = defaultIcon;
    static backgroundColor = "#ccc";
    constructor(color) {
        this.color = color || "#ccc";
        this.fillPercent = 100;
    }

    highlight(fillPercent=100){
        this.color = Star.highlightColor;
        this.fillPercent = fillPercent;
    }

    fill(fillPercent=100){
        this.color = Star.fillColor;
        this.fillPercent = fillPercent;
    }

    remove(){
        this.color = Star.backgroundColor;
        this.fillPercent = 100;
    }
}


class SingleIcon extends React.Component{
    constructor(props){
        super(props);
        this.star = props.star;
        this.color = this.star.color || props.backgroundColor || "#ccc";
        this.index = props.index;
        this.size = props.size;
        this.iconId = props.iconId || uuidv4();
        this.fillColor = props.fillColor || "#222";
        this.highlightColor = props.highlightColor || "#fc0"
        this.strokeColor = props.strokeColor || "rgba(0,0,0,0)";
        this.fillPercent = this.star.fillPercent;
        this.strokeWidth = props.strokeWidth || 2;
        this.direction = props.direction || "row";
        this.icon = props.icon || defaultIcon;
        this.backgroundColor = props.backgroundColor || "#ccc";
        this.prevRatings = props.prevRatings || [];
        this.viewBox = this.icon.viewBox
            .split(' ')
            .map((x, i) => {
                if (i <= 1) {
                    return parseInt(x, 10) - this.strokeWidth;
                }
                return parseInt(x, 10) + 2 * this.strokeWidth;
            })
            .join(' ');

        this.prevFillColors = props.prevFillColors;
        this.state = { fillColor: this.fillColor,
            backgroundColor: this.backgroundColor,
            strokeColor: this.strokeColor, prevFillColors: this.prevFillColors, color: this.color};

    }

    onClick(e){

    }

    getFillPercent(starNumber){
        switch (true) {
            case starNumber <= Math.floor(this.state.rating):
                return 100;
            case starNumber - 1 > this.state.rating:
                return 0;
            default:
                return Math.abs((this.state.rating % 1) * 100);
        }
    }


    render() {
        return <svg onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onClick={this.props.onClick} width={this.size} height={this.size} viewBox={this.viewBox} xmlns={"http://www.w3.org/2000/svg"}>
            <defs>
                <linearGradient id={this.iconId} x1={"0%"} y1={"0%"} x2={this.direction === 'row' ? '100%' : '0%'}
                                y2={this.direction === 'row' ? '0%' : '100%'}>
                    <stop offset={this.fillPercent + '%'} stopColor={this.state.color}/>
                    <stop offset={this.fillPercent + '%'} stopColor={this.state.backgroundColor} stopOpacity={"1"}/>
                </linearGradient>
            </defs>
            <path d={this.icon.path} fill={`url(#${this.iconId}`} stroke={this.strokeColor} strokeWidth={this.strokeWidth + 'px'}/>
        </svg>
    }
};

class IconsRating extends React.Component {
    constructor(props){
        super(props);
        let { numOfIcons, rating=0, iconPadding=0.2, size=20, fillColor, highlightColor, backgroundColor, strokeWidth, strokeColor, direction, customIcon } = props;
        let prevFillColors = Object.fromEntries(Array.from(Array(numOfIcons)).map((_,i)=> [i, fillColor || "#222"]));
        let prevHighlightColors = Array(numOfIcons).fill(highlightColor || "#fc0");
        let prevBackgroundColors = Array(numOfIcons).fill(backgroundColor || "#ccc");
        this.state = { numOfIcons, rating, iconPadding, size, fillColor, highlightColor,
            backgroundColor, strokeWidth, strokeColor, direction, customIcon,
            prevFillColors, prevHighlightColors, prevBackgroundColors, star0: new Star(), star1: new Star(), star2: new Star(), star3: new Star()
        };
    }
    getFillPercent(starNumber){
        switch (true) {
            case starNumber <= Math.floor(this.state.rating):
                return 100;
            case starNumber - 1 > this.state.rating:
                return 0;
            default:
                return Math.abs((this.state.rating % 1) * 100);
        }
    }

    fillEvent(){
        let stars = {};
        for (let i = 0; i < this.state.numOfIcons; i++) {
            stars[`star${i}`] = this.state[`star${i}`];
        }
        for (let i = 0; i < this.state.numOfIcons; i++) {
            if (i <= this.state.rating + 1) {
                stars[`star${i}`].fill(this.getFillPercent(i));
            } else {
                stars[`star${i}`].remove();
            }
        }
        this.setState({...stars})
    }

    highlightEvent(index){
        let stars = {};
        for (let i = 0; i < this.state.numOfIcons; i++) {
            stars[`star${i}`] = this.state[`star${i}`];
        }
        for (let i = 0; i < this.state.numOfIcons; i++) {
            if (i <= index) {
                stars[`star${i}`].highlight();
            } else {
                stars[`star${i}`].remove();
            }
        }
        this.setState({...stars})
    }

    onClick(index){
        this.setState({rating: index});
        this.fillEvent();
        console.log(this.state.rating);
    }

    render() {
        let style = { display: 'flex', columnGap: `${this.state.iconPadding}em`, flexDirection: this.state.direction }
        return <div style={style} title={`${this.state.rating} / ${this.state.numOfIcons}`}>
            {
                new Array(this.state.numOfIcons).fill(null).map((val, key) => {
                    let element = <SingleIcon key={uuidv4()}
                                   index={key}
                                   size={this.state.size}
                                   iconId={uuidv4()}
                                   fillColor={this.state.fillColor}
                                   highlightColor={this.state.highlightColor}
                                   strokeColor={this.state.strokeColor || this.state.fillColor}
                                   fillPercent={this.getFillPercent(key + 1)}
                                   strokeWidth={this.state.strokeWidth}
                                   direction={this.state.direction}
                                   icon={this.state.customIcon}
                                   backgroundColor={this.state.backgroundColor}
                                   prevFillColors={this.state.prevFillColors}
                                              star={this.state[`star${key}`]}
                                  onClick={() => this.onClick(key)}
                                  onMouseEnter={() => this.highlightEvent(key)}
                                  onMouseLeave={() => this.fillEvent()}
                    />

                    return element;
            })}
        </div>
    }
}

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rating: "4", count: 31909, disabled: false}
        this.checkedColor = this.props.checkedColor || "#222";
        this.backgroundColor = this.props.backgroundColor || "#ccc";
        this.onchange = this.onChange.bind(this);
    }

    onChange(e){
        if (this.state.disabled)
            return;
        let value = e.currentTarget.value;
        this.setState({rating: value});
    }

    readOnly(){
        return <IconsRating numOfIcons={4} rating={this.props.rating} size={22}/>
    }

    ratingLabel(value){
        let val = value.toString();
        let checked = this.state.rating === val;
        let labelClassName = `global-star-rating-label global-star-rating-label-${val}`
        let inputClassName = `global-star-rating-input global-star-rating-input-${val}`
        return <>
            <input key={uuidv4()} className={inputClassName} type="radio" id={`${val}-stars`}
                   name="rating" value={`${val}`} checked={checked} onChange={this.onchange}/>
            <label key={uuidv4()} className={labelClassName} htmlFor={`${val}-stars`}>&#9733;</label>
        </>
    }

    rating(){
        let hoverEffects = (this.state.disabled) ? "global-star-rating" : "global-star-rating-hover"
        return <>
            <div className={`global-star-rating ${hoverEffects}`}>
                <div className="global-star-rating-stars">
                    {this.ratingLabel(5)}
                    {this.ratingLabel(4)}
                    {this.ratingLabel(3)}
                    {this.ratingLabel(2)}
                    {this.ratingLabel(1)}
                </div>
                &nbsp;
                <label className="global-star-rating-count">({this.state.count.toLocaleString()})</label>
            </div>
        </>
    }

    render() {
        return <>
            {(this.props.readonly) ? this.readOnly() : this.rating()}
            <label className="star-rating-count-read-only">({this.state.count.toLocaleString()})</label>
        </>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rating);