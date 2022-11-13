import { ethers } from "hardhat";
import { MyToken__factory } from "../typechain-types";

const MYTOKEN_ADDRESS="0xb5f175f4e7a83ff282B83Fb139EC99E19Cfe5B6c";

async function main() {
    const accounts = await ethers.getSigners(); 

    const myTokenFactory = new MyToken__factory(accounts[0]);
    const myTokenContract = myTokenFactory.attach(MYTOKEN_ADDRESS);
    const delegateTx = await myTokenContract.connect(accounts[2]).delegate(accounts[1].address)
    
    await delegateTx.wait();
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
