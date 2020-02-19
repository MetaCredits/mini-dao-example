pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract MetaProxy {

    address public currentSigner;
    mapping (address => uint256) public nonces;

    struct MetaTransaction {
        uint256 nonce;
        address to;
        uint256 expires;
        bytes data;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    function proxy(bytes memory rawMetaTx) public {
        //parse meta tx
        MetaTransaction memory t = rawToMetaTx(rawMetaTx);
        require(t.expires > block.timestamp, "metatx expired");

        //verify signature
        address signer = verifySigner(t);

        require(t.nonce == nonces[signer]++, "invalid nonce");

        currentSigner = signer;

        (bool success, ) = t.to.call(t.data);
        require(success, "Error executing tx");

        currentSigner = address(0x0);
    }

    function rawToMetaTx(bytes memory rawMetaTx) public pure returns (MetaTransaction memory mtx) {

        (uint256 nonce,
        address to,
        uint256 expires,
        bytes memory data,
        uint8 v,
        bytes32 r,
        bytes32 s) = abi.decode(rawMetaTx, (uint256,address,uint256,bytes,uint8,bytes32,bytes32));


        mtx.nonce = nonce;
        mtx.to = to;
        mtx.expires = expires;
        mtx.data = data;
        mtx.v = v;
        mtx.r = r;
        mtx.s = s;
    }

    function verifySigner(MetaTransaction memory _tx) public pure returns (address) {
        bytes32 rawHash = keccak256(abi.encodePacked(_tx.nonce, _tx.to, _tx.expires, _tx.data));
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, rawHash));
        return ecrecover(prefixedHash, _tx.v, _tx.r, _tx.s);
    }

}