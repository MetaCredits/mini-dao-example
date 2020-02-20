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
        <InfoData miniDAOContract={this.props.miniDAOContract} dappFunder={this.props.dappFunder} provider={this.props.provider} />
        <div className="display-row">
          <JoinForm miniDAOContract={this.props.miniDAOContract} dappFunder={this.props.dappFunder} provider={this.props.provider} signer={this.props.signer} />
          <CreateProposal miniDAOContract={this.props.miniDAOContract} dappFunder={this.props.dappFunder} provider={this.props.provider} signer={this.props.signer} />
        </div>
        <div className="display-row">
          <MemberList memberList={this.props.memberList} miniDAOContract={this.props.miniDAOContract} provider={this.props.provider} />
          <ProposalList propList={this.props.proposalList} miniDAOContract={this.props.miniDAOContract} provider={this.props.provider} />
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
          <MainDapp tokenAddress={props.pid} dappFunder={dappFunderContract} miniDAOContract={miniDAOContract} networkId={networkId} signer={signer} provider={provider} memberList={memberList} proposalList={proposalList} />
        </div>
      )
    }}
  </MyWeb3Consumer>
);


export default Dapp;