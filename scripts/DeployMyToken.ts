import { ethers } from "hardhat";

// https://github.com/dethcrypto/TypeChain
import { MyToken__factory } from "../typechain-types";

// const MINT_VALUE = ethers.utils.parseEther("10");
const contractName = "MyToken";

async function main() {
    const accounts = await ethers.getSigners(); 

    const myTokenFactory = new MyToken__factory(accounts[0]);
    const myTokenContract = await myTokenFactory.deploy();

    await myTokenContract.deployed();

    console.log(`${contractName} was deployed at ${myTokenContract.address}`);
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
