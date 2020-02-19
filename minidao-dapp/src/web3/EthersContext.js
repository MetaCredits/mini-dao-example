import React, { Component } from "react";
import { ethers } from 'meta-ethers';
import { navigate } from "@reach/router"
import Web3Error from "./web3Errors"

import getWeb3 from "./getWeb3";
import getContracts from "./getContracts";
import {decodeLogs} from "./web3Utils"

const Context = React.createContext();

export class MyWeb3Provider extends Component {
  constructor(props) {
    super(props);
    this.gatherData = this.gatherData.bind(this);

    this.state = {
      loaded: false,
      refresh: () => { },
      web3: null,
      web3NotFound: false
    }
  }

  setLoaded() {
    this.setState({
      loaded: true
    })
  }

  addGameToList(gameEvent) {
    //let game = event.returned
    this.setState({
      games: gameEvent
    })
  }
  async componentDidMount() {
    this.gatherData()
  }

  async componentDidUpdate() {
    //this.gatherData()
  }

  async gatherData() {
    try {
      // Get network provider and web3 instance
      let web3
      if (!this.state.web3) {
        web3 = await getWeb3();
      } else {
        web3 = this.state.web3
      }

      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      //console.log(provider)
      try {
        await provider.ready
      } catch (e) {
        throw new Web3Error("InvalidProviderError", "Provider Invalid or Non-existent")
      }
      //console.log(provider.network)

      // check that provider is valid AND is rinkeby network
      console.log("CHAINID " + provider.network.chainId)
      if (provider.network.chainId !== 4 && provider.network.chainId !== 5777) {
        throw new Web3Error("ChainIDError", "Not on a supported Network)")
      }

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const network = await provider.getNetwork();
      const networkId = network.chainId;
      const signer = provider.getSigner();

      const contracts = getContracts(networkId)
      const miniDAOJSON = contracts.miniDAO
      const dappFunderJSON = contracts.dappFunder
      console.log("!!!!", dappFunderJSON)

      let miniDAOContract = new ethers.Contract(miniDAOJSON.address, miniDAOJSON.abi, signer);
      let dappFunderContract = new ethers.Contract(dappFunderJSON.address, dappFunderJSON.abi, signer);

      this.setState({ web3, provider, signer, networkId, accounts, miniDAOContract, dappFunderContract }, this.setLoaded);

      let logName = "MemberJoined"
      const filters = await miniDAOContract.filters[logName]()

      let filter = {
        address: miniDAOJSON.address,
        topics: filters.topics,
        fromBlock: 0, //TODO?
        toBlock: "latest"
      }
    let logs = await provider.getLogs(filter)
    console.log(logs)
    let decoded = decodeLogs(logs, miniDAOContract.interface.events[logName])

    let memberList = []
    for (let i = 0; i < decoded.length; i++) {
      const element = decoded[i];
      memberList.push(element[0])
    }

    console.log(memberList)
    this.setState({ memberList }) //simple value



    let logName2 = "ProposalSubmitted"
      const filters2 = await miniDAOContract.filters[logName2](null)

      let filter2 = {
        address: miniDAOJSON.address,
        topics: filters2.topics,
        fromBlock: 0, //TODO?
        toBlock: "latest"
      }
    let logs2 = await provider.getLogs(filter2)

    let decoded2 = decodeLogs(logs2, miniDAOContract.interface.events[logName2])
    console.log(decoded2)
    let proposalList = []
    for (let i = 0; i < decoded2.length; i++) {
      const element = decoded2[i];
      proposalList.push([element[0], element[1],element[2]])
    }

    console.log(proposalList)
    this.setState({ proposalList }) //simple value

    } catch (error) {

      switch (error.type) {
        case "InvalidProviderError":
          alert("No browser web3 provider found, please install a wallet such as metamask to use this app")
          navigate("/web3NotFound")
          break;
        case "ChainIDError":
          alert("Please change your metamask network to local or rinkeby")
          navigate("/web3NotFound")
          break;
        default:
          break;
      }
      console.error(error);
    }

  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

}

export const MyWeb3Consumer = Context.Consumer;

export default Context