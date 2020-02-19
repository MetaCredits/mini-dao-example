import React, { Component } from "react";
import "./index.css"
import InfoBoxWrap from "../forms/InfoBoxWrap"

class MemberList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
      memberList: []
    };
  }



  componentDidMount = async () => {

  }


  render() {
    if (!this.props.memberList) {
      return (<div></div>)
    }
    return (
      <InfoBoxWrap title="MiniDAO Member List" helperText={'Member List'}>
        <div className="member-list-div">
          <ul>
            {this.props.memberList.map((m, idx) => (<li key={idx} >{m}</li>))}
          </ul>
        </div>
      </InfoBoxWrap>)

  }


}

export default MemberList;