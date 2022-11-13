// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IMyToken {
    function getPastVotes(address, uint256) external view returns (uint256);
}

contract TokenizedBallot {

    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    IMyToken public tokenContract;
    Proposal[] public proposals;
    uint256 public targetBlockNumber;

    mapping(address => uint256) public votingPowerSpent; // keeps track of the voting power spent

    constructor(
        bytes32[] memory proposalNames,
        address _tokenContract,
        uint256 _targetBlockNumber
    ) {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({voteCount: 0, name: proposalNames[i]}));
        }

        tokenContract = IMyToken(_tokenContract);
        targetBlockNumber = _targetBlockNumber;
    }

    function vote(uint256 proposal, uint256 amount) public {
        uint256 votePower_ = votingPower(msg.sender);
        require(
            votePower_ >= amount,
            "TokenizedBallot: vote more then votepower available for this account"
        );

        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function votingPower(address account)
        public
        view
        returns (uint256)
    {
        return
            tokenContract.getPastVotes(account, targetBlockNumber) -
            votingPowerSpent[account];
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}