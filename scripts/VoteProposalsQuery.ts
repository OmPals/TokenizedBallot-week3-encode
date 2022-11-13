import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";

const TOKENIZEDBALLOT_ADDRESS="0x6F8Bea9B74f4E4a3328E2eA776D37c92E5Ede7Bb";
const PROPOSAL_COUNT = 5;

async function main() {
    const accounts = await ethers.getSigners(); 

    const tokenizedBallotFactory = new TokenizedBallot__factory(accounts[0]);
    const tokenizedBallotContract = tokenizedBallotFactory.attach(TOKENIZEDBALLOT_ADDRESS);

    let proposalsPromiseArr = [];
    for(let idx=0; idx<PROPOSAL_COUNT;idx++) {
        proposalsPromiseArr.push(tokenizedBallotContract.proposals(idx));
    }

    const proposals = await Promise.all(proposalsPromiseArr);

    proposals.forEach(x => {
        console.log("Proposal Name: ", ethers.utils.parseBytes32String(x.name));
        console.log("Proposal VoteCount: ", x.voteCount.toString());
        console.log("\n");
    });

    const winningProposalIdx = await tokenizedBallotContract.winningProposal();
    const winningProposal = await tokenizedBallotContract.proposals(winningProposalIdx);

    console.log(`Winner Name is: ${ethers.utils.parseBytes32String(winningProposal.name)}
    That won with vote count: ${winningProposal.voteCount}`);
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
