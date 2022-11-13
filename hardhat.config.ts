import * as dotenv from 'dotenv'
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  // const accounts = await hre.ethers.getSigners();

  console.log(process.env.ALCHEMY_RPC_URL);
  console.log(process.env.PRIVATE_KEY);

  // for (const account of accounts) {
  //   console.log(account.address);
  // }
});

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: { tests: "tests" },
  // gasReporter: {
  //   enabled: true
  // },
  networks: {
    goerli: {
      url: process.env.POKT_RPC_URL,
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2, process.env.PRIVATE_KEY3, process.env.PRIVATE_KEY4, process.env.PRIVATE_KEY5]
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY
    }
  }
};

export default config;
