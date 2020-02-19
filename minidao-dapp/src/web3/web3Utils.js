import {ethers} from 'meta-ethers';

export const metaEthers = ethers

export const decodeLogs = (logs, contractEventsInterface) => {
    console.log("HI", logs)
    let result = []
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        console.log(log)
        let cleaned = {};
        let decoded = contractEventsInterface.decode(
            log.data,
            log.topics
        );
        contractEventsInterface.inputs.forEach((input, i) => {
            if (input.type.startsWith("uint")) {
                let x = decoded[input.name];
                cleaned[input.name] = x.toString();
            } else {
                cleaned[input.name] = decoded[input.name];
            }
        });
        log.decoded = cleaned;
        result.push(decoded)
    }
    return result
}

export const arrayify = ethers.utils.arrayify

export const isHexAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const bigNumberify = ethers.utils.bigNumberify
export const formatEther = ethers.utils.formatEther
export const compareHex = (a,b) => {
    return (a.toLowerCase() === b.toLowerCase())
}