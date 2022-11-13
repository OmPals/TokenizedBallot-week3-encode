import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseEther("10");
const MYTOKEN_ADDRESS="0xb5f175f4e7a83ff282B83Fb139EC99E19Cfe5B6c";

async function main() {
    const accounts = await ethers.getSigners(); 

    const myTokenFactory = new MyToken__factory(accounts[0]);
    const myTokenContract = myTokenFactory.attach(MYTOKEN_ADDRESS);
    const mintTx = await myTokenContract.mint(accounts[1].address, MINT_VALUE); 

    await mintTx.wait();

    const votes = await myTokenContract.getVotes(accounts[1].address);

    console.log(
        `Before self-delegating: Minted ${MINT_VALUE.toString()} to the address ${accounts[1].address},
         voting power: ${votes.toString()}` 
    );

    const delegateTx = await myTokenContract.connect(accounts[1]).delegate(accounts[1].address)

    await delegateTx.wait();
    const votesAfter = await myTokenContract.getVotes(accounts[1].address);
    console.log(
        `Before self-delegating: Minted ${MINT_VALUE.toString()} to the address ${accounts[1].address},
         voting power: ${votesAfter.toString()}` 
    );

    // Transfer tokens
    const transferTx = await myTokenContract.connect(accounts[1]).transfer(accounts[2].address, MINT_VALUE.div(2))

    await transferTx.wait();

    const votesAfterTransfer = await myTokenContract.getVotes(accounts[1].address);
    const votesAfterTransfer2 = await myTokenContract.getVotes(accounts[2].address);

    
    console.log(
        `Before self-delegating: Minted ${MINT_VALUE.toString()} to the address ${accounts[2].address},
         voting power: ${votesAfterTransfer2.toString()}`);
    
    console.log(
    `Before self-delegating: Minted ${MINT_VALUE.toString()} to the address ${accounts[1].address},
        voting power: ${votesAfterTransfer.toString()}`);

    const lastBlock = await ethers.provider.getBlock("latest");

    console.log(`Current block: ${lastBlock.number}`);

    const pastVotes = await myTokenContract.connect(accounts[1]).getPastVotes(accounts[1].address, 
        lastBlock.number-1);

    console.log(`Account ${accounts[1].address} had ${pastVotes.toString()}`);
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
