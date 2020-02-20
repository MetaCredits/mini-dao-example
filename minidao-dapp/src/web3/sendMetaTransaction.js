

const sendMeta = async (rawMtx) => {

    let lambadurl = "https://m2r4h61qui.execute-api.us-east-1.amazonaws.com/prod/ethdenver-dapp-signer"
    let data = await axios.post(lambadurl, { metaTx: rawMtx })

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

    let tx = await localDappFunderContract.executeMetaTransaction(abiMTX, sig, { gasLimit: 5000000 })
    console.log(tx)
    this.setState({ metaTxCreated: true, signature: sig, raw: abiMTX });



}

export default getContracts;
