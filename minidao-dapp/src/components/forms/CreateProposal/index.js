import React, { Component } from "react";
import { metaEthers } from "../../../web3/web3Utils";
import InfoBoxWrap from "../InfoBoxWrap"
import axios from "axios"

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            isMember: false,
            metadata: null,
            txHash:null

        };

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
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
        const { metadata } = this.state
        try {
            await this.props.contract.submitProposal(metadata)
        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };

    submitMetaTransaction = async () => {
        try {
            const { metadata } = this.state

            let raw = await this.state.metaMiniContract.submitProposal(metadata)
            let lambadurl = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-dapp-signer"

            let data = await axios.post(lambadurl, { metaTx: raw })

            let localMetaProxyAddr =  await this.props.miniDAOContract.metaTxProxyContract()
            let abiMTX = await this.props.dappFunder.abiEncodeMetaTransction(localMetaProxyAddr, raw)

            let sig = data.data.signature
            //Will not work if local...mock service with a hardcoded local key
            let lambadurl2 = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-relay-pool"
            let data2 = await axios.post(lambadurl2, { encodedMTX: abiMTX, signature: sig})

            console.log(data2.data)
            this.setState({ metaTxCreated: true, signature: sig, raw: abiMTX, txHash: data2.data.tx.hash});


        } catch (err) {
            console.log(err)
            alert(err.toString())
        }

    };

    render() {
        return (
            <InfoBoxWrap title="Submit Proposal" helperText={'PROPOSAL FORM'}>
                <form id={this.props.id} onSubmit={this.handleSubmit}>
                    {this.state.isMember ? <></> : <p><font color="dark-red">You are not a member, must join MiniDAO to submit a proposal</font></p>}

                    <label>Data:</label>
                    <br></br>
                    <input name="metadata" type="text" onChange={this.handleChange} />
                    <br></br>

                    <br></br>
                    <input type="submit" value="Submit" disabled={!this.state.isMember} />
                
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
export default CreateForm;