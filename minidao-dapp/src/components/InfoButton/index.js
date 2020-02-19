import React, { Component } from "react";

import "./index.css"

class InfoButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            info: "Placehold A really long sentence, hopefully it wraps, blah blah blah blah, something else this that and the other."
        };
    }

    componentDidMount = async () => {
        if (this.props.info) {
            this.setState({info: this.props.info})
        } else {
            this.setState({hidden: true})
        }

    }

    render() {
        if (this.state.hidden) {
            return <></>
        }
        return (
            <div className="form-info-div" onClick={()=> {console.log("infobutton")}}>
                <span>?</span>
                <span className="tooltiptext">{this.state.info}</span>
            </div>
        );
    }
}



export default InfoButton;