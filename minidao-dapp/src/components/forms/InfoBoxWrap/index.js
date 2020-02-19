import React from "react";
import InfoButton from "../../InfoButton"
import "./index.css"

const InfoBoxWrap = (props) => {
    return (
        <div className="info-box">
            <InfoButton info={props.helperText}/> 
            <h3>{props.title}</h3>
            {props.children}
        </div>
    )
};

export default InfoBoxWrap;