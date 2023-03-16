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
For the staking dapp we will be requiring two more contracts, one for the **BuidlToken** and the other for the **Staking Contract**. BuidlToken will be our test token which we will mint for the staker and staking contract will be the contract which will be responsible for staking the BuidlNFT and minting the BuidlToken.

---

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

---

- Create a new file named `Staking.sol` in the `contracts` directory.
- Intiate the file with the imports required by our Staking Contract.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "./BuidlToken.sol";
```

here we are importing the `IERC721` which is the interface of the ERC721 contract provided by OpenZeppelin. We are also importing the `ERC721Holder` which is the contract provided by OpenZeppelin which will help us to receive the NFTs. We are also importing the `BuidlToken` contract which we have created in the previous step.

- Let's instantiate the contract with the following code:

```solidity
contract Staking is ERC721Holder {
    /// @notice NFT contract
    IERC721 public buidlNFT;

    /// @notice Token contract
    BuidlToken public buidlToken;

    /// @dev owner of the contract
    address owner;

    /// @notice Emission rate per second
    uint256 public EMISSION_RATE = ((10 ** 18) / (uint256(1 days)));

    /// @notice Staking start time
    mapping(address => uint256) public tokenStakedAt;

    /// @notice Token ID of the staked NFT
    mapping(address => uint256) public stakeTokenId;

    /// @notice Constructor
    /// @param nft  NFT contract address
    /// @param token Token contract address
    constructor(address nft, address token) {
        buidlNFT = IERC721(nft);
        buidlToken = BuidlToken(token);
    }
```

here we have instantiated the contract with the name `Staking` and inherited the `ERC721Holder`.
Then we have intialised several variables, the `buidlNFT` for **NFT contract** and the `buidlToken`for **Token contract**. We are also initializing the **owner** of the contract with the `msg.sender` which is the address of the account that deployed the contract. We have intialised the `EMISSION_RATE` with the value of **1 token per day**. We have also created two **mappings** named `tokenStakedAt` and `stakeTokenId` which will store the time at which the NFT was staked and the token ID of the staked NFT respectively. The constructor will take the address of the NFT contract and the Token contract as parameters and will pass them to the variables `buidlNFT` and `buidlToken` respectively.

- Let's create the function to stake the NFT

```solidity
    /// Function to stake the NFT
    /// This will transfer the NFT to the contract, and start the staking timer for the user.
    /// @param tokenId Token ID of the NFT to stake
    function stakeNFT(uint256 tokenId) external {
        require(buidlNFT.ownerOf(tokenId) == msg.sender, "ERR:NO");
        buidlNFT.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenStakedAt[msg.sender] = block.timestamp;
        stakeTokenId[msg.sender] = tokenId;
    }
```

here we have created a function named `stakeNFT` which will take the token ID of the NFT to be staked as a parameter. This function will be called by the user to stake the NFT. We are first checking if the user is the owner of the NFT, if yes then we are transferring the NFT to the contract using the `safeTransferFrom` function provided by the `IERC721` interface. We are also storing the time at which the NFT was staked in the `tokenStakedAt` mapping and the token ID of the staked NFT in the `stakeTokenId` mapping.

> Note: The `safeTransferFrom` function will only work if the owner of the NFT has approved the contract to transfer the NFT. For that we will be using the `approve` function provided by the `IERC721` interface which will be called by the user before calling the `stakeNFT` function directly from the frontend.

- Let's create a function to calculate reward amount user is going to receive when unstaking the NFT.

```solidity
    /// Function to calculate the reward for the staker
    /// @param staker Address of the staker
    function calculateReward(address staker) public view returns (uint256) {
        require(tokenStakedAt[staker] != 0, "ERR:NS");
        uint256 time = block.timestamp - tokenStakedAt[staker];
        return (time * EMISSION_RATE);
    }
```

here we have created a function named `calculateReward` which will take the address of the staker as a parameter. This function will be called by the user to calculate the reward amount he/she is going to receive when unstaking the NFT. We are first checking if the user has staked the NFT or not, if yes then we are calculating the time for which the NFT was staked and multiplying it with the `EMISSION_RATE` to get the reward amount.

- Let's create a function to unstake the NFT

```solidity
    /// Function to unstake the NFT
    /// This will transfer the NFT back to the user, and mint the reward for the user.
    /// @param tokenId Token ID of the NFT to unstake
    function unStakeNFT(uint256 tokenId) external {
        require(stakeTokenId[msg.sender] == tokenId, "ERR:NY");
        uint256 rewardAmount = calculateReward(msg.sender);

        buidlNFT.safeTransferFrom(address(this), msg.sender, tokenId);

        buidlToken.mintToken(msg.sender, rewardAmount);

        delete stakeTokenId[msg.sender];
        delete tokenStakedAt[msg.sender];
    }
}
```

here we have created a function named `unStakeNFT` which will take the token ID of the NFT to be unstaked as a parameter. This function will be called by the user to unstake the NFT. We are first checking if the user has staked the NFT or not, if yes then we are calculating the reward amount using the `calculateReward` function and minting the reward amount for the user using the `mintToken` function of the `BuidlToken` contract. We are also transferring the NFT back to the user using the `safeTransferFrom` function provided by the `IERC721` interface. Then we are deleting the token ID of the staked NFT and the time at which the NFT was staked from the `stakeTokenId` and `tokenStakedAt` mappings respectively.
