import React, { Component } from "react";
import { metaEthers } from "../../../web3/web3Utils";
import InfoBoxWrap from "../InfoBoxWrap"
import axios from "axios"

import "./index.css"
class JoinForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMember: false,
            zeroBalance: false,
            metaTxCreated: false,
            txHash:null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {

        let isMember = await this.props.miniDAOContract.members(window.ethereum.selectedAddress)
        this.setState({ isMember });

        let ms = new metaEthers.providers.MetaSigner(this.props.provider, window.ethereum.selectedAddress)
        let metaMiniContract = new metaEthers.MetaContract(this.props.miniDAOContract.address, this.props.miniDAOContract.interface, ms)

        this.setState({ metaMiniContract });

        let balanceBN = await this.props.provider.getBalance(window.ethereum.selectedAddress)
        if (balanceBN.eq(0)) {
            this.setState({ zeroBalance: true });

        }
    }



    handleSubmit(event) {
        event.preventDefault();
        if (this.state.zeroBalance) {
            this.submitMetaTransaction()
        } else {
            this.submitTransaction()
        }
    }

    submitTransaction = async () => {
        try {
            await this.props.miniDAOContract.join()


        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };

    submitMetaTransaction = async () => {
        try {
            let raw = await this.state.metaMiniContract.join()
            let lambadurl = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-dapp-signer"

            let data = await axios.post(lambadurl, { metaTx: raw })

            let localMetaProxyAddr =  await this.props.miniDAOContract.metaTxProxyContract()
            console.log("localmetapro",localMetaProxyAddr)
            let abiMTX = await this.props.dappFunder.abiEncodeMetaTransction(localMetaProxyAddr, raw)
            let encodedMeta = metaEthers.utils.defaultAbiCoder.encode(["address", "bytes"], [localMetaProxyAddr, raw])
            console.log(this.props.miniDAOContract.address)
            let sig = data.data.signature
            //Will not work if local...mock service with a hardcoded local key
            let lambadurl2 = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-relay-pool"
            let data2 = await axios.post(lambadurl2, { encodedMTX: encodedMeta, signature: sig})

            console.log(data2.data)
            this.setState({ metaTxCreated: true, signature: sig, raw: abiMTX, txHash: data2.data.tx.hash});

        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };


    render() {
        return (
            <InfoBoxWrap title="Join MiniDAO" helperText={'Join FORM'}>
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    {this.state.isMember ? <p>>You are already a member - good job</p> : <></>}
                    <br></br>

                    <input type="submit" value="Join!" disabled={this.state.isMember} />
                    {this.state.txHash ?
                        <div>
                            <label>Transaction:</label>
                            <p><a href={"http://rinkeby.etherscan.io/tx/" + this.state.txHash}>https://rinkeby.etherscan.io/tx/{this.state.txHash}</a></p>

                        </div> : <></>}
                </form>
            </InfoBoxWrap>
        );
    }
}
export default JoinForm;