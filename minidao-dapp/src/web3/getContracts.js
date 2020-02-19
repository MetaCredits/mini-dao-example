
// import MiniDAORinkeby from "../contracts/rinkeby/ExampleCoin.json";

import MiniDAOLocal from "../contracts/local/MetaMiniDAO.json";
import DappFunderLocal from "../contracts/local/DappFunder.json";

const getContracts = (networkId) => {
    let miniDAO;
    let dappFunder
    if (networkId === 4) {
        miniDAO = MiniDAOLocal
        miniDAO.address = MiniDAOLocal.networks[4].address
    }
    if (networkId === 5777) {
        miniDAO = MiniDAOLocal
        miniDAO.address = MiniDAOLocal.networks[5777].address
        dappFunder = DappFunderLocal
        dappFunder.address = DappFunderLocal.networks[5777].address
    }

    return { miniDAO, dappFunder }
}

export default getContracts;
