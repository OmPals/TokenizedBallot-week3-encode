import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";

const TOKENIZEDBALLOT_ADDRESS="0x6F8Bea9B74f4E4a3328E2eA776D37c92E5Ede7Bb";

const VOTE_VALUE_1 = ethers.utils.parseEther("5");
const VOTE_VALUE_3 = ethers.utils.parseEther("3");
const VOTE_VALUE_5 = ethers.utils.parseEther("2");

const VOTE_VALUE_2 = ethers.utils.parseEther("1");
const VOTE_VALUE_4 = ethers.utils.parseEther("0");

async function main() {
    const accounts = await ethers.getSigners(); 

    const tokenizedBallotFactory = new TokenizedBallot__factory(accounts[0]);
    const tokenizedBallotContract = tokenizedBallotFactory.attach(TOKENIZEDBALLOT_ADDRESS);

    const randomVote_1 = 3;
    const randomVote_3 = 0;
    const randomVote_5 = 2;
    const randomVote_2 = 4;
    const randomVote_4 = 1;

    const [ac1_votes, ac3_votes, ac5_votes] = 
    await Promise.all([
        tokenizedBallotContract.connect(accounts[1]).vote(randomVote_1, VOTE_VALUE_1),
        tokenizedBallotContract.connect(accounts[3]).vote(randomVote_3, VOTE_VALUE_3),
        tokenizedBallotContract.connect(accounts[5]).vote(randomVote_5, VOTE_VALUE_5)
    ]);

    await ac1_votes.wait();
    await ac3_votes.wait();
    await ac5_votes.wait();
    

    const [ac2_votes, ac4_votes] = 
    await Promise.all([
        tokenizedBallotContract.connect(accounts[2]).vote(randomVote_2, VOTE_VALUE_2),
        tokenizedBallotContract.connect(accounts[4]).vote(randomVote_4, VOTE_VALUE_4)
    ]);

    await ac2_votes.wait();
    await ac4_votes.wait();

    let proposalsAfterVoting: Array<[name: string, voteCount: BigNumber]>;
    proposalsAfterVoting = await 
    Promise.all([
        tokenizedBallotContract.proposals(0),
        tokenizedBallotContract.proposals(1),
        tokenizedBallotContract.proposals(2),
        tokenizedBallotContract.proposals(3),
        tokenizedBallotContract.proposals(4)
    ]);

    proposalsAfterVoting.forEach(x => {
        console.log(x.toString());
    });
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
