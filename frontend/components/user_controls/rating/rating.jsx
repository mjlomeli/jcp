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

class IconData {
    static defaultFillColor = "#222";
    static defaultHighlightColor = "#fc0"
    static defaultStrokeColor = "rgba(0,0,0,0)";
    static defaultBackgroundColor = "#ccc";
    static defaultPadding = 0.2;
    static defaultSize = 20;
    static defaultPath = "m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z";
    static defaultViewBox = "0 0 50 48";
    static defaultStrokeWidth = 2;
    static defaultDirection = "row";
    static defaultFillPercent = 100;


    constructor({size, direction, fillPercent, strokeWidth, color, fillColor, highlightColor, strokeColor, backgroundColor, customIcon, padding, iconId, path, viewBox}) {
        this.color = color || IconData.defaultBackgroundColor;
        this.iconId = iconId || uuidv4();
        this.fillPercent = fillPercent || IconData.defaultFillPercent;
        this.fillColor = fillColor || IconData.defaultFillColor;
        this.highlightColor = highlightColor || IconData.defaultHighlightColor;
        this.strokeColor = strokeColor || IconData.defaultStrokeColor;
        this.backgroundColor = backgroundColor || IconData.defaultBackgroundColor;
        this.size = size || IconData.defaultSize;
        this.padding = padding || IconData.defaultPadding;
        this.strokeWidth = strokeWidth || IconData.defaultStrokeWidth;
        this.direction = direction || IconData.defaultDirection;
        this.style = { display: 'flex', columnGap: `${this.padding}em`, flexDirection: this.direction }
        this.path = path || (customIcon && customIcon.path) || IconData.defaultPath;
        this.viewBox = (viewBox || (customIcon && customIcon.viewBox) || IconData.defaultViewBox)
            .split(' ')
            .map((x, i) => {
                if (i <= 1) {
                    return parseInt(x, 10) - this.strokeWidth;
                }
                return parseInt(x, 10) + 2 * this.strokeWidth;
            })
            .join(' ');
    }

    highlight(fillPercent=100){
        this.color = this.highlightColor;
        this.fillPercent = fillPercent;
    }

    fill(fillPercent=100){
        this.color = this.fillColor;
        this.fillPercent = fillPercent;
    }

    remove(){
        this.color = this.backgroundColor;
        this.fillPercent = 100;
    }
}


class Icon extends React.Component{
    constructor(props){
        super(props);
        this.state = { ...props.iconData };
    }

    render() {
        return <svg className={this.props.className || ""} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onClick={this.props.onClick} width={this.state.size} height={this.state.size} viewBox={this.state.viewBox} xmlns={"http://www.w3.org/2000/svg"}>
            <defs>
                <linearGradient id={this.state.iconId} x1={"0%"} y1={"0%"} x2={this.state.direction === 'row' ? '100%' : '0%'}
                                y2={this.state.direction === 'row' ? '0%' : '100%'}>
                    <stop offset={this.state.fillPercent + '%'} stopColor={this.state.color}/>
                    <stop offset={this.state.fillPercent + '%'} stopColor={this.state.backgroundColor} stopOpacity={"1"}/>
                </linearGradient>
            </defs>
            <path d={this.state.path} fill={`url(#${this.state.iconId}`} stroke={this.state.strokeColor} strokeWidth={this.state.strokeWidth + 'px'}/>
        </svg>
    }
};

class IconsRating extends React.Component {
    constructor(props){
        super(props);
        this.state = { numOfIcons: props.numOfIcons, rating: props.rating || 0, ...this.setIcons()};
    }

    componentDidMount() {
        this.fillEvent();
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

    setIcons(){
        Object.freeze(this.props);
        let icons = {};
        for (let i = 0; i < this.props.numOfIcons; i++) {
            let copy = Object.assign({}, this.props);
            icons[`iconData${i}`] = new IconData(copy);
        }
        return icons;
    }

    fillEvent(){
        let icons = {};
        for (let i = 0; i < this.state.numOfIcons; i++) {
            icons[`iconData${i}`] = this.state[`iconData${i}`];
        }
        for (let i = 0; i < this.state.numOfIcons; i++) {
            if (i <= this.state.rating + 1) {
                icons[`iconData${i}`].fill(this.getFillPercent(i));
            } else {
                icons[`iconData${i}`].remove();
            }
        }
        this.setState({...icons})
    }

    highlightEvent(index){
        if (this.props.disabled)
            return;
        let icons = {};
        for (let i = 0; i < this.state.numOfIcons; i++) {
            icons[`iconData${i}`] = this.state[`iconData${i}`];
        }
        for (let i = 0; i < this.state.numOfIcons; i++) {
            if (i <= index) {
                icons[`iconData${i}`].highlight();
            } else {
                icons[`iconData${i}`].remove();
            }
        }
        this.setState({...icons})
    }

    onClick(index){
        if (this.props.disabled)
            return;
        this.setState({rating: index});
        this.fillEvent();
    }

    render() {
        let style = { display: 'flex', columnGap: `${this.state.iconPadding}em`, flexDirection: this.state.direction }
        return <div style={style} title={`${this.state.rating} / ${this.state.numOfIcons}`}>
            {
                new Array(this.state.numOfIcons).fill(null).map((val, key) => {
                    let id = uuidv4();
                    return <Icon className={this.props.className || ""} key={id} index={key}
                                       iconData={this.state[`iconData${key}`]}
                                       onClick={() => this.onClick(key)}
                                       onMouseEnter={() => this.highlightEvent(key)}
                                       onMouseLeave={() => this.fillEvent()}
                    />
                })
            }
        </div>
    }
}

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {numOfIcons: 5, rating: this.props.rating || 0, count: 31909, disabled: this.props.disabled || false}
    }

    render() {
        let className = `global-rating ${this.props.className || ""}`;
        let iconClass = `global-rating-icon ${this.props.iconClass || ""}`;
        let countClass = `global-rating-count ${this.props.countClass || ""}`
        return <div className={className}>
            <IconsRating className={iconClass} numOfIcons={this.state.numOfIcons} rating={this.state.rating} disabled={this.state.disabled} />
            <label className={countClass}>({this.state.count.toLocaleString()})</label>
        </div>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rating);