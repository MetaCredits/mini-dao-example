import React, { Component } from "react";
import { metaEthers } from "../../../web3/web3Utils";
import InfoBoxWrap from "../InfoBoxWrap"
import axios from "axios"
import DappFunderJSON from "../../../contracts/local/DappFunder.json";
import MetaProxyJSON from "../../../contracts/local/MetaProxy.json";
class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            isMember: false,
            metadata: null,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
        let isMember = await this.props.contract.members(window.ethereum.selectedAddress)
        this.setState({ isMember });

        let ms = new metaEthers.providers.MetaSigner(this.props.provider, window.ethereum.selectedAddress)
        let metaMiniContract = new metaEthers.MetaContract(this.props.contract.address, this.props.contract.interface, ms)

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
            console.log("raw metatx", raw)
            let lambadurl = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-dapp-signer"
            let data = await axios.post(lambadurl, { metaTx: raw })
            console.log("data from post", data)

            //Will not work if local...mock service with a hardcoded local key
            // let lambadurl2 = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-relay-pool"
            // let data2 = await axios.post(lambadurl2, { metaTx: raw, signature: data.data.signature})

            let sig = data.data.signature

            let localMetaProxy = MetaProxyJSON.networks['5777'].address
            let localDFAddress = DappFunderJSON.networks['5777'].address
            
            let pk = "0x985cd01f352f32d8501aa7637d91fa1a30fd240d99d012b13f2b09926ac8d46d"

            let wallet = new metaEthers.Wallet(pk, this.props.provider)
            let localDappFunderContract = new metaEthers.Contract(localDFAddress, DappFunderJSON.abi, wallet)

            let abiMTX = await localDappFunderContract.abiEncodeMetaTransction(localMetaProxy, raw)

            let tx = await localDappFunderContract.executeMetaTransaction(abiMTX,sig, {gasLimit:5000000})
            console.log(tx)
            this.setState({ metaTxCreated: true, signature: sig, raw: abiMTX });

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
                
                    {this.state.metaTxCreated ?
                        <div>
                            <label>Signature:</label>
                            <p>{this.state.signature}</p>
                            <br></br>
                            <label>Raw Transaction:</label>
                            <p>{this.state.raw}</p>
                        </div> : <></>}
                </form>
            </InfoBoxWrap>
        );
    }
}
export default CreateForm;