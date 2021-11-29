import {connect} from 'react-redux';
import React from 'react';
import './viewlayout.css'
import GridLayout from "../grid_layout/grid_layout";

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "view_layout"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class ViewLayout extends React.Component {
    constructor(props) {
        super(props);

        if (props.areas && props.components) {
            this.classGrid = `global-viewlayout-grid ${props.gridClass || ""}`;
            this.classItems = `global-viewlayout-items ${props.itemClass || ""}`;
        } else {
            this.classGrid = `global-viewlayout-grid global-default-viewlayout-grid`;
            this.classItems = `global-viewlayout-items global-default-viewlayout-items`;
        }
    }

    render() {
        return <GridLayout />

        return <div className={this.classGrid}>
            <div><img src="https://i.etsystatic.com/17305851/c/1801/1432/177/346/il/4ad87f/3411776815/il_340x270.3411776815_s6oc.jpg" alt="img"/></div>
            <div className={this.classItems}>
                <div className="grid-item">1</div>
                <div className="grid-item">2</div>
                <div className="grid-item">3</div>
                <div className="grid-item">4</div>
                <div className="grid-item">5</div>
                <div className="grid-item">6</div>
                <div className="grid-item">7</div>
                <div className="grid-item">8</div>
                <div className="grid-item">9</div>
            </div>
            <h1>Short Text</h1>
            <div>
                This is short text.
            </div>
            <h1>Long Text</h1>
            <div>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewLayout);