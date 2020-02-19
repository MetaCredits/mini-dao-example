pragma solidity ^0.6.0;

import "./MetaWrapper.sol";

contract MiniDAO {

    mapping (address => bool) public members;
    mapping (bytes32 => Proposal) public proposals;

    uint public totalProposals;
    uint public totalMembers;

    struct Proposal {
        string data;
        uint256 voteCount;
        mapping (address => bool) voted;
    }


    function join() public {
        address sender = getSender();
        require(members[sender] == false, "already a member");
        members[sender] = true;
        totalMembers++;
        emit MemberJoined(sender);
    }

    function quit() public {
        address sender = getSender();
        require(members[sender] == true, "not a member");
        members[sender] = false;
        totalMembers--;
        emit MemberQuit(sender);
    }

    function submitProposal(string memory _data) public{
        address sender = getSender();
        bytes32 pId = keccak256(abi.encodePacked(sender, _data));
        require(members[sender] && !proposals[pId].voted[sender], "not a member/already submitted");
        proposals[pId].data = _data;
        proposals[pId].voteCount++;
        proposals[pId].voted[sender] = true;
        totalProposals++;

        emit ProposalSubmitted(sender, pId, _data);
    }

    function voteForProposal(bytes32 _id) public {
        address sender = getSender();
        require(members[sender] && !proposals[_id].voted[sender], "not allowed to vote");
        
        proposals[_id].voted[sender] = true;
        proposals[_id].voteCount++;
    }

    function getSender() internal virtual view returns (address) {
        return msg.sender;
    }

    event MemberJoined(address indexed member);
    event MemberQuit(address indexed member);
    event ProposalSubmitted(address indexed submitter, bytes32 indexed proposalId, string text);



    
}