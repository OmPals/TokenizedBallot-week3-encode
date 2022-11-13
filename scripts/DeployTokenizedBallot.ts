import { ethers } from "hardhat";
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";

const PROPOSAL_NAMES = ["Dragolite","Ashena","Toanub","Flamebug","Shelupine"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

async function main() {
    const accounts = await ethers.getSigners(); 

    const myTokenFactory = new MyToken__factory(accounts[0]);
    const myTokenContract = await myTokenFactory.deploy();

    await myTokenContract.deployed();

    console.log(`MyToken was deployed at ${myTokenContract.address}`);

    const tokenizedBallotFactory = new TokenizedBallot__factory(accounts[0]);
    
    const lastBlock = await ethers.provider.getBlock("latest");

    const bytes32_proposals = convertStringArrayToBytes32(PROPOSAL_NAMES);
    const tokenizedBallotContract = await tokenizedBallotFactory.deploy(
        bytes32_proposals,
        myTokenContract.address,
        lastBlock.number
    );

    await tokenizedBallotContract.deployed();

    console.log(`TokenizedBallot was deployed at ${tokenizedBallotContract.address}`);
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
