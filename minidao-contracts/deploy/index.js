require('module-alias/register')

const utils = require("@utils/index.js");
const ethers = require("ethers")
const provider = utils.provider
let deployAccount = utils.ethersAccount(0)

const main = async () => {
    console.log("Deployment not configured yet!")
    await deployLocal()
}

const deployRinkeby = async () => {

}

const deployLocal = async () => {

    const proxy = await utils.deployContractAndWriteToFile('MetaProxy', deployAccount, [])
    console.log("MetaProxy deployed at address: " + proxy.address)

    const miniDAO = await utils.deployContractAndWriteToFile('MetaMiniDAO', deployAccount, [proxy.address])
    console.log("MiniDAO deployed at address: " + miniDAO.address)
}


main();