require('module-alias/register')

const utils = require('@utils');
const ethers = utils.ethers
const provider = utils.provider


const miniDAOContract = utils.getDeployedContract('MetaMiniDAO')
const metaProxyContract = utils.getDeployedContract('MetaProxy')


const deployAccount = utils.ethersAccount(0)
const otherAccount = utils.ethersAccount(1)
const altAccount = utils.ethersAccount(2)
const certAccount = utils.ethersAccount(3)

let metaproxyAddress = metaProxyContract.address

const main = async () => {
    console.log("Running Main Task...")

    
}

main()