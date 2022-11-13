import { ethers } from "hardhat";
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";

const MYTOKEN_ADDRESS="0xb5f175f4e7a83ff282B83Fb139EC99E19Cfe5B6c";
const TOKENIZEDBALLOT_ADDRESS="0x6F8Bea9B74f4E4a3328E2eA776D37c92E5Ede7Bb";

async function main() {
    const accounts = await ethers.getSigners(); 

    const myTokenFactory = new MyToken__factory(accounts[0]);
    const myTokenContract = myTokenFactory.attach(MYTOKEN_ADDRESS);

    const tokenizedBallotFactory = new TokenizedBallot__factory(accounts[0]);
    const tokenizedBallotContract = tokenizedBallotFactory.attach(TOKENIZEDBALLOT_ADDRESS);
    
    const [ac1_delegates, ac2_delegates, ac3_delegates, ac4_delegates, ac5_delegates] = await 
    Promise.all([
        myTokenContract.delegates(accounts[1].address)
        ,myTokenContract.delegates(accounts[2].address)
        ,myTokenContract.delegates(accounts[3].address)
        ,myTokenContract.delegates(accounts[4].address)
        ,myTokenContract.delegates(accounts[5].address)]);

    console.log(
        `Who Delegates to whom:
        Account - 1 (${accounts[1].address}) Delegates: ${ac1_delegates},
        Account - 2 (${accounts[2].address}) Delegates: ${ac2_delegates},
        Account - 3 (${accounts[3].address}) Delegates: ${ac3_delegates},
        Account - 4 (${accounts[4].address}) Delegates: ${ac4_delegates},
        Account - 5 (${accounts[5].address}) Delegates: ${ac5_delegates}`
    );

    const [votes1, votes2, votes3, votes4, votes5] = await 
    Promise.all([
        myTokenContract.getVotes(accounts[1].address)
        ,myTokenContract.getVotes(accounts[2].address)
        ,myTokenContract.getVotes(accounts[3].address)
        ,myTokenContract.getVotes(accounts[4].address)
        ,myTokenContract.getVotes(accounts[5].address)]);

    console.log(
        `MyToken Conrtract's getVotes:
        Account - 1 (${accounts[1].address}) Voting Power - 1: ${votes1},
        Account - 2 (${accounts[2].address}) Voting Power - 2: ${votes2},
        Account - 3 (${accounts[3].address}) Voting Power - 3: ${votes3},
        Account - 4 (${accounts[4].address}) Voting Power - 4: ${votes4},
        Account - 5 (${accounts[5].address}) Voting Power - 5: ${votes5}`
    );

    const [ac1_voting_power, ac2_voting_power, ac3_voting_power, ac4_voting_power, ac5_voting_power] = await 
    Promise.all([
        tokenizedBallotContract.votingPower(accounts[1].address)
        ,tokenizedBallotContract.votingPower(accounts[2].address)
        ,tokenizedBallotContract.votingPower(accounts[3].address)
        ,tokenizedBallotContract.votingPower(accounts[4].address)
        ,tokenizedBallotContract.votingPower(accounts[5].address)]);

    console.log(
        `TokenizedBallot's votingPower:
        Account - 1 (${accounts[1].address}) Voting Power: ${ac1_voting_power},
        Account - 2 (${accounts[2].address}) Voting Power: ${ac2_voting_power},
        Account - 3 (${accounts[3].address}) Voting Power: ${ac3_voting_power},
        Account - 4 (${accounts[4].address}) Voting Power: ${ac4_voting_power},
        Account - 5 (${accounts[5].address}) Voting Power: ${ac5_voting_power}`
    );
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
