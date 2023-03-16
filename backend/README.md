# BUIDL-IRL

## STAKING DAPP

### What are we going to build?

In this tutorial we will be building an Staking dApp on Polygon Mumbai Testnet.

### Tech Stack Used

- NextJS
- Solidity
- Hardhat
- WAGMI
- Wallet Connect

### Let's start BUIDLing

#### 1. Setting up the project

- Open your terminal and run the following commands
  - `git clone https://github.com/PolygonJaipur/BUIDL-IRL.git`
  - `cd BUIDL-IRL`
  - `git checkout staking-dapp`
  - `cd backend`
  - `yarn install`
    These commands in the same order will install all the dependencies for building.
- Create `.env` file in the `backend` directory.

  - Go to [Alchemy](https://dashboard.alchemy.com/) and create a new account. Then create a new app and copy the URL and paste it in the `.env` file. Like this:
    `ALCHEMY_HTTP_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"`
  - Go to our Metamask Wallet, copy the Private Key from there and paste it like this:
    `PRIVATE_KEY = Your Private Key`
  - Go to [Polygon Scan](https://polygonscan.com/myapikey), sign in and then create an API Key. After that paste it like this:
    `POLYGON_SCAN_KEY= Your Polygon Scan Key`

> So our development environment is ready!!!

#### 2. Writing the Smart Contract

You will notice that you already have the `BuidlNFT.sol` present in your contract directory, and yeah it's the same contract we built in the previous tutorial. Cool right? Working on your own contract to build a better dApp.
For the staking dapp we will be requiring two more contracts, one for the BuidlToken and the other for the Staking Contract. BuidlToken will be our test token which we will mint for the staker and staking contract will be the contract which will be responsible for staking the BuidlNFT and minting the BuidlToken.

- Create a new file named `BuidlToken.sol` in the `contracts` directory.
- Intiate the file with the imports required by our BuidlToken.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

here we are importing the ERC20.sol is the standard ERC20 contract provided by OpenZeppelin.

- Let's instantiate the contract with the following code:

```solidity
contract BuidlToken is ERC20 {
    /// @dev Address of the owner.
    address owner;

    /// Constructor to initialize the ERC20 Token
    /// @param name token name
    /// @param symbol token symbol
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
    }
```

here we have instantiated the contract with the name `BuidlToken` and we are inheriting the ERC20 contract from OpenZeppelin. We are also initializing the owner of the contract with the `msg.sender` which is the address of the account that deployed the contract. The constructor will take the name and symbol of the Token as parameters and will pass them to the constructor of the `ERC20` contract.

- Let's create Mint Function for the BuidlToken

```solidity
    /// Function to mint the token for a particular address.
    /// @param to Address of the receiver.
    /// @param amount Amount of token to be minted.
    function mintToken(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
```

here we have created a function named `mintToken` which will take the address of the receiver and the amount of token to be minted as parameters. This function will be called by the Staking Contract to mint the BuidlToken for the staker. The `_mint` function is provided by the `ERC20` contract which we have inherited.
