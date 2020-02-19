import React, { Component } from "react";
import "./index.css"
import InfoButton from "../InfoButton";
import {formatEther} from "../../web3/web3Utils"

class InfoData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contractLoaded: false,
      loadingMessage: "Loading Contract...",
      owner: null
    };

  }
  setLoaded() {
    this.setState({
      contractLoaded: true
    })
  }

  componentDidMount = async () => {
    this.loadContract()
  }

  async getContractValue(fname) {
    let v
    try {
      let s = await this.props.contract[fname]()
      v = s.toString()
    } catch (error) {
      v = false
    }
    return v
  }


  async loadContract() {
    try {

      let memberCount = await this.getContractValue("totalMembers")
      let proposalCount = await this.getContractValue("totalProposals")
      let owner = await this.getContractValue("owner")
      let memstat = await this.props.contract.members(window.ethereum.selectedAddress)
      let isMember = "You are a member"
      if (!memstat) {
        isMember = "Not a member"
      }

      let balanceBN = await this.props.provider.getBalance(window.ethereum.selectedAddress)
      balanceBN = formatEther(balanceBN);
      let balance = balanceBN.toString()

      let fundBalanceBN = await this.props.provider.getBalance(this.props.dappFunder.address)
      let funds = fundBalanceBN.toString()

      this.setState({ memberCount, proposalCount, owner, isMember, balance, funds}, this.setLoaded)

    } catch (err) {
      console.log(err)
      this.setState({ loadingMessage: err.toString() })

    }
  }

  render() {
    if (!this.state.contractLoaded) {
      return (<div>{this.state.loadingMessage}</div>)
    }
    return (
      <div className="token-data-div">
        <InfoButton info={"Something something"} />
        <span className="token-data-title">MiniDAO Data</span>
        <div className="token-inner-data-div" >

          <label className="token-data-label">Total Members:</label>
          <span className="token-data-span" >&nbsp;&nbsp;{this.state.memberCount}</span>
          <br></br>
          <label className="token-data-label">Total Proposals:</label>
          <span className="token-data-span">&nbsp;&nbsp;{this.state.proposalCount}</span>
          <br></br>
          <OptionalLabel label="Owner" value={this.state.owner} />
          <br></br>
          <label className="token-data-label">Membership Status:</label>
          <span className="token-data-span">&nbsp;&nbsp;{this.state.isMember}</span>
                    <br></br>
          <label className="token-data-label">ETH Balance:</label>
          <span className="token-data-span">&nbsp;&nbsp;{this.state.balance}</span>
          <br></br>
          <label className="token-data-label">Meta Funds Remaining:</label>
          <span className="token-data-span">&nbsp;&nbsp;{this.state.funds} wei</span>          <br></br>
        </div>
      </div>
    );
  }
}


const OptionalLabel = ({ label, value }) => {
  if (!value) {
    return (<></>)
  }
  return (
    <>
      <label className="token-data-label">{label}:</label>
      <span className="token-data-span">&nbsp;&nbsp;{value}</span>
    </>
  )
};



export default InfoData;