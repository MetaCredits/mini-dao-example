import React, { Component } from "react";
import { MyWeb3Consumer } from "../../web3/EthersContext"
import InfoData from "../../components/InfoData"
import CreateProposal from "../../components/forms/CreateProposal"
import JoinForm from "../../components/forms/JoinForm"
import MemberList from "../../components/MemberList"
import ProposalList from "../../components/ProposalList"

import "./index.css"

class MainDapp extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  setLoaded() {
    this.setState({
      contractLoaded: true
    })
  }

  render() {
    return (
      <div>
        <InfoData contract={this.props.contract} dappFunder={this.props.dappFunder} provider={this.props.provider} />
        <div className="display-row">
          <JoinForm contract={this.props.contract} provider={this.props.provider} signer={this.props.signer} />
          <CreateProposal contract={this.props.contract} provider={this.props.provider} signer={this.props.signer} />
        </div>
        <div className="display-row">
          <MemberList memberList={this.props.memberList} contract={this.props.contract} provider={this.props.provider} />
          <ProposalList propList={this.props.proposalList} contract={this.props.contract} provider={this.props.provider} />
        </div>
      </div>
    );
  }
}



const Dapp = (props) => (
  <MyWeb3Consumer>
    {({ loaded, networkId, signer, provider, miniDAOContract, dappFunderContract, memberList, proposalList }) => {
      if (!loaded) {
        return (<div>Loading form</div>)
      }
      return (
        <div>
          <MainDapp tokenAddress={props.pid} dappFunder={dappFunderContract} contract={miniDAOContract} networkId={networkId} signer={signer} provider={provider} memberList={memberList} proposalList={proposalList} />
        </div>
      )
    }}
  </MyWeb3Consumer>
);


export default Dapp;