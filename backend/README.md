# BUIDL-IRL

## NFT COLLECTION

### What are we going to build?

In this tutorial we will be building an NFT collection on Polygon Mumbai Testnet.

### Tech Stack Used

- NextJS
- Solidity
- Hardhat
- Ethers.js
- Wallet Connect

### Prerequisites

- [Metamask Installed as extension in your Browser](https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/)

- [Nodejs](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/) and [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) Installed in your system

- [Knowledge of Git and GitHub](https://www.geeksforgeeks.org/ultimate-guide-git-github/?ref=gcse)

- [Install VS CODE](https://code.visualstudio.com/docs/setup/windows)or Any other IDE

### Let's start building

#### 1. Setting up the project

- Open your terminal and run the following commands
  - `git clone https://github.com/PolygonJaipur/BUIDL-IRL.git`
  - `cd BUIDL-IRL`
  - `git checkout nft-collection`
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

- Delete the file `Lock.sol` in contract folder. And create new file `BuidlNFT.sol`
- Intiate the file with the imports required by our NFT Collection.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```

- here we are importing the following:

  - `ERC721` is the standard NFT contract provided by OpenZeppelin.
  - `ERC721URIStorage` is the contract that allows us to store the NFT's metadata on the blockchain.
  - `Counters` is a library that provides counters that can only be incremented or decremented by one. This is used to keep track of the tokenIds.

- Let's instantiate the contract with the following code:

```solidity
contract BuidlNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address owner;
}
```

- here we have instantiated the contract with the name `BuidlNFT` and we are inheriting the `ERC721` and `ERC721URIStorage` contracts. We are also using the `Counters` library to keep track of the tokenIds and defining an `owner` variable that will be used to store the address of the owner of the contract. The `owner` variable will be used to restrict the access of some functions to the owner of the contract.

- Let's start with the constructor now. The constructor will take the name and symbol of the NFT as parameters and will pass them to the constructor of the `ERC721` contract.

```solidity
constructor(string memory name, string memory symbol)
    ERC721(name, symbol)
{
    owner = msg.sender;
}
```

Also `owner` variable is initialised here which will store the address of the deployer as the contructor is only intiated when deployed.

- Let's create our first modifier `onlyOnwer` which will be used to restrict the access of some functions to the owner of the contract.

```solidity
modifier onlyOwner() {
        require(msg.sender == onwer, "ERR:NO");
        _;
    }
```

We create modifiers so we can reuse them in multiple functions. Here we are checking if the address of the caller of the function is equal to the `owner` address. If it is equal then the function will be executed otherwise an error message will be displayed. The `_` is used to execute the function in which the modifier is used.

- Let's mint our first NFT with the metadata uri

```solidity
function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
```

This function takes an address and the token URI as parameters. The `to` is the adddress the NFT is minted to and the `uri` is the link to the metadata of the NFT. Before executing anything this function will parameters will pass to the modifier `onlyOwner` as required to check whether the conditions are met or not. If the conditions are met the function get executed else it will be reverted with error. The function will first get the current tokenId from the `_tokenIdCounter` and then increment it. Then it will mint the NFT to the address passed as a parameter and set the token URI of the NFT. The `_safeMint` function is used to mint the NFT and the `_setTokenURI` function is used to set the token URI of the NFT.

- Let's write the overrides functions

```solidity
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }


```

These override functions are required by the solidity compiler to work properly. The `_burn` function is used to burn the NFT and the `tokenURI` function is used to get the token URI of the NFT. We are overriding these functions to use the functions of the `ERC721URIStorage` contract. The `super` keyword is used to call the functions of the parent contract.

> So we have written our contract.

#### 3. Testing the Smart Contract

- Delete the `Lock.js` file from **test** folder and create new file named `mint.js`
- Paste the following code in the file

```javascript
const hre = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
describe("NFT Collection", function () {
  async function fixture() {
    const [owner, user1] = await hre.ethers.getSigners();
    const NFT = await ethers.getContractFactory("BuidlNFT");
    const nft = await NFT.deploy("BuidlNFT", "BN");
    return { owner, user1, nft };
  }

  it("Should mint the NFT", async function () {
    const { owner, user1, nft } = await loadFixture(fixture);
    await nft.safeMint(user1.address, "");
    expect(await nft.balanceOf(user1.address)).to.equal(1);
  });

  it("Should not mint the NFT", async function () {
    const { owner, user1, nft } = await loadFixture(fixture);
    expect(
      await nft.connect(user1).safeMint(user1.address, "")
    ).to.be.revertedWith("ERR:NO");
  });
});
```

- Run `npx hardhat test test/mint.js` to test the code.

> So you have successfully written and tested your smart contract.

#### 4. Deploying and Verifying the Smart Contract

- Delete the `Lock.js` file from **scripts** folder and create new file named `deploy.js`
- Paste the following code in the file

```javascript
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  try {
    const NFT = await ethers.getContractFactory("BuidlNFT");
    const nft = await NFT.deploy("BuidlNFT", "BN");
    await nft.deployed();
    console.log("Contract address:", nft.address);
  } catch (error) {
    console.error(error);
  }

  console.log("Sleeping.....");
  await sleep(40000);

  try {
    await hre.run("verify:verify", {
      address: nft.address,
      constructorArguments: ["BuidlNFT", "BN"],
    });
  } catch (error) {
    console.error(error);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

- Run `npx hardhat run scripts/deploy.js --network mumbai` to deploy and verify the contract on the Mumbai Testnet.

> So you have successfully deployed and verified your smart contract on Polygon Mumbai Testnet.
