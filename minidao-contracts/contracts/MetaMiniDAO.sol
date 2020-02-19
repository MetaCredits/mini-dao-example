pragma solidity ^0.6.0;

import "./MiniDAO.sol";
import "./MetaWrapper.sol";

contract MetaMiniDAO is MiniDAO, MetaWrapper {

    constructor(address _metaProxy) MetaWrapper(_metaProxy) public {
        owner = msg.sender;
    }

    address public owner;

    modifier onlyOwner() {
        require(getSender() == owner, "onlyOwner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }

    function getSender() internal  view override(MiniDAO, MetaWrapper) returns (address) { return MetaWrapper.getSender(); }

}