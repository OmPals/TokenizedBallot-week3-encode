// In the MintVotingTokens.ts script, we did...
// Account-1 gets 10 MTKs minted
// It trasferred 5 MTKs to Account-2
// Account-2 delegated it's votes to Account-1
// Account-1 self delegated

// In this script we are going to perform...
// Account-3 gets 10 MTKs minted
// It transfers 3-3 MTKs to Account-4 and Account-5
// Account-3 self delegates 
// Account-4 delegates it's votes to Account-2
// Account-5 self delegates 

import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");
const MINT_VALUE_TRANSFER = ethers.utils.parseEther("3");
const MYTOKEN_ADDRESS="0xb5f175f4e7a83ff282B83Fb139EC99E19Cfe5B6c";

async function main() {
    const accounts = await ethers.getSigners(); 

    const myTokenFactory = new MyToken__factory(accounts[0]);
    const myTokenContract = myTokenFactory.attach(MYTOKEN_ADDRESS);
    const mintTx = await myTokenContract.mint(accounts[3].address, MINT_VALUE); 

    await mintTx.wait();

    const selfDelegate3Tx = await myTokenContract.connect(accounts[3]).delegate(accounts[3].address);
    const selfDelegate5Tx = await myTokenContract.connect(accounts[5]).delegate(accounts[5].address);

    await selfDelegate3Tx.wait();
    await selfDelegate5Tx.wait();

    // Transfer tokens from Account-3 to Account-4 and Account-5
    const [transfer34Tx, transfer35Tx] = await 
    Promise.all([myTokenContract.connect(accounts[3]).transfer(accounts[4].address, MINT_VALUE_TRANSFER)
    ,myTokenContract.connect(accounts[3]).transfer(accounts[5].address, MINT_VALUE_TRANSFER)]);

    await transfer34Tx.wait(); 
    await transfer35Tx.wait();

    const delegate42Tx = await myTokenContract.connect(accounts[4]).delegate(accounts[2].address);
    await delegate42Tx.wait();
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
});

