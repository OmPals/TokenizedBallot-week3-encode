# Tokenized Ballot Smart Contract based on ERC20 and ERC20Votes

## Introduction
In the decentralized voting, ballot smart contract works like atomic voting. From an account, one can only vote once. While in tokenized ballot contract, from an account, one can vote some amount of tokens to some proposals. 
We achieve it by composing an ERC20Vote contract into the modified version of Ballot Smart Contract, which we call it "TokenizedBallot" contract.
The delegate function works differently with tokenized ballot. One can delegate some amount of ERC20Vote tokens to some other account. So, the voting power doesn't go to some other account unlike simple ballot. 

## Usage
1) Clone this repo
2) Create a .env file in the root folder
3) Copy the following to the .env file: 
```
MNEMONIC=""

# Used for contract deployment 
PRIVATE_KEY=""

# Used for testing functionalities
PRIVATE_KEY1=""
PRIVATE_KEY2=""
PRIVATE_KEY3=""
PRIVATE_KEY4=""
PRIVATE_KEY5=""

INFURA_API_KEY=""
INFURA_API_SECRET=""
ALCHEMY_API_KEY=""
ETHERSCAN_API_KEY=""

GOERLI_RPC_URL=""
ALCHEMY_RPC_URL=""
POKT_RPC_URL=""
RINKEBY_RPC_URL=""
```
4) Install all the dependencies by running the following command in your terminal: 
```
yarn install
```
5) Compile all the contracts. This will add all the abi of contracts and make a typescript interface to access the contracts from scripts with the help of TypeChain.
```
yarn hardhat compile
```
6) Now, let's understand the scripts and deploy and use contracts: 
  
    - First we wil require to deploy the MyToken contract - MTK. Run the following command: 
    ```
    yarn hardhat run scripts\DeployMyToken.ts --network goerli
    ```
    This will deploy the contract to the Goerli testnet. 

    - Then we will setup our testnet accounts to have some MTKs. This will give this account voting power in TokenizedBallot context later on after we deploy it.
    Run the following commands: 
    ```
    yarn hardhat run scripts\MintVotingTokens.ts --network goerli
    yarn hardhat run scripts\DelegateVotes.ts --network goerli
    yarn hardhat run scripts\SetupVotingAccounts.ts --network goerli
    ```

    - After having all the accounts setup for the voting, now we will deploy the TokenizedBallot Contract. Due to it's current implementation, the target block is only assigned during construction time and it cannot be changed. So, if we have deployed the Tokenized Ballot before minting/delegating/transferring MTKs, then in all the accounts, votingPower should have remained 0, even after minting/delegating/transferring to that accoumt. So now, we will deploy it. Run the following command: 
    ```
    yarn hardhat run scripts\DeployTokenizedBallot.ts --network goerli
    ```

    - Next we will be having some voting time. The script: scripts\CastVote.ts contains the voting process by 5 voters we added private keys of earlier in the .env file. 
    ```
    yarn hardhat run scripts\CastVote.ts --network goerli
    ```

    - We will check which proposal won by running the query script: 
    ```
    yarn hardhat run scripts\WinningProposalQuery.ts --network goerli
    ```

This is how the overall workflow for TokenizedBallot looks like... 
Many things are hardcoded, which would be made easier to operate in future. A beautiful UI would also be something to consider.
