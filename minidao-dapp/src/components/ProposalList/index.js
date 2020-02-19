import React, { Component } from "react";
import "./index.css"
import InfoBoxWrap from "../forms/InfoBoxWrap"

class ProposalList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
    };
  }
  

  componentDidMount = async () => {

  }

  componentDidUpdate = async () => {
    console.log(this.props)
  }


  render() {
    if (!this.props.propList) {
        return (<div></div>)
      }
    return (
        <InfoBoxWrap title="MiniDAO Proposal List" helperText={'Proposal List'}>

      <div className="prop-list-div">
          <ul>
          {this.props.propList.map((m, idx) => (<li key={idx} >{m[2] + " - " +m[0]}</li>))}
          </ul>
      </div>
      </InfoBoxWrap>)
    
  }


}

export default ProposalList;