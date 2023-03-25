# BUIDL-IRL

## Gasless Transactions

gm gm!!!

you have come a long way, minting your first NFT to staking it. Now it's time to improve the user experience which you and all end user deserves! And for this we will be using **Account Abstraction** through [Biconomy](https://www.biconomy.io/).

## What is Account Abstraction?

Account abstraction is a concept that allows users to interact with smart contracts without having to pay for gas. This is done by relayers who pay for the gas and then charge the user for the transaction. This is a very useful concept for dApps that want to provide a better user experience.

> You can learn more about Account Abstraction [here](https://biconomy.gitbook.io/sdk/additional-content/account-abstraction)

## What is Biconomy?

The Biconomy SDK provides solutions from onboarding to user engagement for a decentralised application (dApp) in a non-custodial way. It is a one-stop solution to enable an effortless experience in your dApp as it eases onboarding for new users and abstracts away transaction complexities that your users face on a daily basis. This is enabled using Smart Contract Wallets (SCW) built on top of our multi-chain Relayer Infrastructure.

> Learn more about Biconomy [here](https://biconomy.gitbook.io/sdk/introduction/overview)

---

---

Let's BUIDL!!!

## Tech Stack Used

- NextJS
- Solidity
- Hardhat
- Ethers.js
- Wallet Connect

## Prerequisites

- [Metamask Installed as extension in your Browser](https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/)

- [Nodejs](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/) and [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) Installed in your system

- [Knowledge of Git and GitHub](https://www.geeksforgeeks.org/ultimate-guide-git-github/?ref=gcse)

- [Install VS CODE](https://code.visualstudio.com/docs/setup/windows)or Any other IDE

### 1. Setting up the project

- Fork the Git Repo
  ![Screenshot 2023-03-18 at 12 12 41 PM](https://user-images.githubusercontent.com/79016290/226089900-69f45efe-f521-4c39-a8cc-41d6dcade675.png)
  THEN
  ![Screenshot 2023-03-18 at 12 19 33 PM](https://user-images.githubusercontent.com/79016290/226090248-057cb68c-3fb6-4194-941e-c33b2648c0d9.png)

- Open your terminal and run the following commands

  - `git clone https://github.com/{username}/BUIDL-IRL.git`
  - `cd BUIDL-IRL`
  - `git checkout gasless-transactions`
  - `cd frontend`
  - `yarn install`
    These commands in the same order will install all the dependencies for building.

- Create an `.env` file in `frontend` folder.

  ```text
  NEXT_PUBLIC_WEB3_PROJECT_ID = "Your Wallet Connect Project ID"
  ```

---

---

### 2. Installing the Biconomy SDK

- Run the following command in the terminal

  ```bash
  yarn add @biconomy/core-types @biconomy/smart-account @biconomy/web3-auth
  ```

  This will install the Biconomy SDK in your project.

---

---

### 3. Setting up the Biconomy SDK

- Create a new file named `Main.js` in `frontend/components` folder.
- Input all the imports

  ```javascript
  import React, { useEffect, useState } from "react";
  import { useAccount, useSigner } from "wagmi";

  /// Imports required by Biconomy
  import { ChainId } from "@biconomy/core-types";
  import SmartAccount from "@biconomy/smart-account";

  /// Importing the components
  import UnstakedNft from "../Modal/UnStakedNFT";
  import StakedNft from "../Modal/StakedNft";
  import TokenBal from "../Modal/TokenBal";
  import Mint from "../../pages/mint";
  ```

  Here

  - the starting two imports are for managing the state of the Next App and the state of the wallet.
  - the next two imports are for importing the Biconomy SDK.
  - the rest of the imports are for importing the components that we will be using in our app.

- Create a new function named `main.jsx` and export it.

  ```javascript
  const Main = () => {};
  export default Main;
  ```

- Now create few state variables

  ```javascript
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [smartAccount, setSmartAccount] = useState(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const activeChainId = ChainId.POLYGON_MUMBAI;
  ```

  Here

  - `signer` is the signer of the wallet.
  - `address` is the address of the wallet.
  - `smartAccount` is the instance of the Smart Account.
  - `scwAddress` is the address of the Smart Contract Wallet.
  - `scwLoading` is the state variable that will be used to show the loading state.
  - `activeChainId` is the chain id of the network on which we want to deploy our smart contract wallet.

- Now define our `useState` function.

      ```javascript

        useEffect(() => {
        if (signer) {
        async function setupSmartAccount() {
        setScwAddress("");
        setScwLoading(true);

        const smartAccount = new SmartAccount(signer.provider, {
          activeNetworkId: activeChainId,
          supportedNetworksIds: [activeChainId],
          networkConfig: [
            {
              chainId: activeChainId,
              dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
            },
          ],
        });
        console.log("wallet", smartAccount);

        const smartAccountss = await smartAccount.init();
        console.info("smartAccount", smartAccountss);
        setScwAddress(smartAccount.address);
        setSmartAccount(smartAccount);
        setScwLoading(false);
      }
      if (!!signer.provider && !!address) {
        setupSmartAccount();
      }}
      }, [address, signer]);
      ```

  Here

  - if the user connects to the wallet, the `setupSmartAccount` function will be called.
  - `setUpSmartAccount` is the function that will be used to create the instance of the Smart Account. This function will be called when the user connects their wallet and will set the state variables accordingly.

- Lastly, we will return the JSX for our app.

  ```javascript
  /// Passing the smartAccount to the components
  return (
    <div>
      {scwLoading && <h2>Loading Smart Account...</h2>}
      {scwAddress && console.log(scwAddress)}
      <TokenBal smartAccount={smartAccount} />
      <StakedNft smartAccount={smartAccount} />
      <UnstakedNft smartAccount={smartAccount} />
      <Mint smartAccount={smartAccount} />
    </div>
  );
  ```

  Here

  - `scwLoading` is the state variable that will be used to show the loading state.
  - `scwAddress` is the address of the Smart Contract Wallet.
  - `TokenBal` is the component that will be used to show the balance of the token.
  - `StakedNft` is the component that will be used to show the staked NFTs.
  - `UnstakedNft` is the component that will be used to show the unstaked NFTs.

---

---

### 4. Make `mint` function gasless

- Go to `frontend/pages/mint.jsx`
- Import `ethers`

  ```javascript
  import { ethers } from "ethers";
  ```

- Change the `mint` function present in it to this

  ```javascript
  const mintNFT = async () => {
    try {
      const nftContract = new ethers.utils.Interface(NFTAbi.abi);
      const data = nftContract.encodeFunctionData("safeMint", [
        smartAccount.address,
        "https://bafkreih73g4bdfee55w7izme3ryt6imjuh2nykdnxxpwe6eepdqrrkjcjm.ipfs.nftstorage.link/",
      ]);
      const tx = {
        to: NFTAbi.address,
        data: data,
      };

      const txResponse = await smartAccount.sendGasLessTransaction({
        transaction: tx,
      });
      console.log("tx hash generated", txResponse.hash);
      const receipt = await txResponse.wait();
      console.log("tx receipt", receipt);

      window.alert("NFT Minted");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  ```

  Here

  - `nftContract` is the interface of the NFT contract.
  - `data` is the encoded form of the `safeMint` function and the parameters that we want to pass to it.
  - `tx` is the JSON fromatted object required by the Biconomy SDK.
  - `txResponse` is the **gasless transaction** we sent using the `smartAccount` by passing the `tx` object.
  - `receipt` is the receipt of the transaction. This will be used to check if the transaction was successful or not.

- Change the returning jsx to the below given code

  ```javascript
  return (
    <div>
      {smartAccount?.address && (
        <button
          className="p-3 bg-[#ff1] text-black text-lg rounded-xl mx-[50%] min-w-[150px] my-5 hover:scale-105 font-medium"
          onClick={mintNFT}
        >
          Mint NFT
        </button>
      )}
    </div>
  );
  ```

  Here

  - `smartAccount?.address` is the address of the smart account.

- After removing the unwanted imports and variables our `mint.jsx` file will look like this

  ```javascript
  import { useRouter } from "next/router";
  import React from "react";
  import NFTAbi from "@/ABIs/BuidlNFT.json";
  import { ethers } from "ethers";

  const Mint = ({ smartAccount }) => {
    const router = useRouter();

    const mintNFT = async () => {
      try {
        const nftContract = new ethers.utils.Interface(NFTAbi.abi);
        const data = nftContract.encodeFunctionData("safeMint", [
          smartAccount.address,
          "https://bafkreih73g4bdfee55w7izme3ryt6imjuh2nykdnxxpwe6eepdqrrkjcjm.ipfs.nftstorage.link/",
        ]);
        const tx = {
          to: NFTAbi.address,
          data: data,
        };

        const txResponse = await smartAccount.sendGasLessTransaction({
          transaction: tx,
        });
        console.log("tx hash generated", txResponse.hash);
        const receipt = await txResponse.wait();
        console.log("tx receipt", receipt);

        window.alert("NFT Minted");
        router.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div>
        {smartAccount?.address && (
          <button
            className="p-3 bg-[#ff1] text-black text-lg rounded-xl mx-[50%] min-w-[150px] my-5 hover:scale-105 font-medium"
            onClick={mintNFT}
          >
            Mint NFT
          </button>
        )}
      </div>
    );
  };

  export default Mint;
  ```

### 5. Now let's make `stake` and `unstake` functions gasless

- Go to `frontend/components/Cards/NFTCard.jsx`
- Copy and paste the following code:

  ```javascript
  import React, { useEffect, useState } from "react";
  import Image from "next/image";
  import NFTAbi from "@/ABIs/BuidlNFT.json";
  import StakingAbi from "@/ABIs/Staking.json";
  import { ethers } from "ethers";

  const NFTCard = ({ url, stake, tokenId, smartAccount }) => {
    const [nft, setNft] = useState({
      name: "",
      image: "",
      desc: "",
      tokenID: tokenId,
    });

    const stakeNft = async () => {
      const txs = [];
      const nftContractInterface = new ethers.utils.Interface(NFTAbi.abi);
      const stakingContractInterface = new ethers.utils.Interface(
        StakingAbi.abi
      );

      const data1 = nftContractInterface.encodeFunctionData(
        "setApprovalForAll",
        [StakingAbi.address, true]
      );
      const tx1 = {
        to: NFTAbi.address,
        data: data1,
      };
      txs.push(tx1);
      const data2 = stakingContractInterface.encodeFunctionData("stakeNFT", [
        nft.tokenID,
      ]);
      const tx2 = {
        to: StakingAbi.address,
        data: data2,
      };
      txs.push(tx2);

      const txResponse = await smartAccount.sendGaslessTransactionBatch({
        transactions: txs,
      });
      console.log("tx hash generated", txResponse.hash);
      const receipt = await txResponse.wait();
      console.log("tx receipt", receipt);
    };

    const unStakeNft = async () => {
      const txs = [];
      const withdrawApproval = new ethers.utils.Interface(NFTAbi.abi);
      const unStake = new ethers.utils.Interface(StakingAbi.abi);

      const data1 = withdrawApproval.encodeFunctionData("setApprovalForAll", [
        StakingAbi.address,
        false,
      ]);
      const tx1 = {
        to: NFTAbi.address,
        data: data1,
      };
      txs.push(tx1);
      const data2 = unStake.encodeFunctionData("unStakeNFT", [nft.tokenID]);
      console.log(nft.tokenID);
      const tx2 = {
        to: StakingAbi.address,
        data: data2,
      };
      txs.push(tx2);

      const txResponse = await smartAccount.sendGaslessTransactionBatch({
        transactions: txs,
      });
      console.log("tx hash generated", txResponse.hash);
      const receipt = await txResponse.wait();
      console.log("tx receipt", receipt);
    };
    useEffect(() => {
      if (url) {
        const getData = async () => {
          try {
            const res = await fetch(url);
            const data = await res.json();

            setNft({
              name: data.name,
              image: data.image,
              desc: data.description,
              tokenID: tokenId,
            });
          } catch (err) {
            console.log(err);
          }
        };
        getData();
      }
    }, [tokenId, url]);

    return (
      <div>
        {stake ? (
          <div>
            <section className="text-center max-w-fit border px-3  rounded-md border-[#ffffff82] shadow-lg mx-2 hover:scale-105">
              <h2 className="text-2xl my-2">{nft.name}</h2>
              <Image src={nft.image} alt={nft.name} width={200} height={400} />
              <h2 className="text-md text-[#ffffffbe] mt-2">{nft.desc}</h2>
              <button
                className="bg-[#524ffffb] px-3 py-1 my-3 rounded-md font-medium mb-3 w-[60%] text-lg hover:scale-105"
                onClick={stakeNft}
              >
                Stake
              </button>
            </section>
          </div>
        ) : (
          <div>
            <section className="text-center max-w-fit border px-3  rounded-md border-[#ffffff82] shadow-lg hover:scale-105">
              <h2 className="text-2xl my-2">{nft.name}</h2>
              <Image src={nft.image} alt={nft.name} width={200} height={400} />
              <h2 className="text-md text-[#ffffffbe] mt-2">{nft.desc}</h2>
              <button
                className="bg-[#ff0909] px-3 py-1 my-3 rounded-md font-medium mb-3 w-[60%] text-lg hover:scale-105"
                onClick={unStakeNft}
              >
                Withdraw
              </button>
            </section>
          </div>
        )}
      </div>
    );
  };

  export default NFTCard;
  ```

  Now let's understand what **new** we did here.

  - First we imported `ethers` from `ethers` library.
  - Second we make one more property in `NFTCard` component called `smartAccount` which will be used to send gasless transactions.
  - Then we modified `stakeNft` and `unStakeNft` functions to send gasless transactions.
  - In the `stakeNft` function we first created two interfaces for `NFT` and `Staking` contracts.
  - Then we encoded the data for `setApprovalForAll` function of `NFT` contract and `stakeNFT` function of `Staking` contract.
  - Since there will be two transactions we created two objects `tx1` and `tx2` and pushed them into an array `txs`.
  - Now, we used `smartAccount.sendGaslessTransactionBatch` function to send the batch of transactions.
  - The same thing we did in `unStakeNft` function. We created two interfaces for `NFT` and `Staking` contracts. Then we encoded the data for `setApprovalForAll` function of `NFT` contract and `unStakeNFT` function of `Staking` contract. Then we created two objects `tx1` and `tx2` and pushed them into an array `txs`. Then we used `smartAccount.sendGaslessTransactionBatch` function to send the batch of transactions.

---

---

### 6. Change the modals parameters according to our needs

- Go to `frontend/components/Modal/StakedNFT.jsx` and paste the following code.

  ```jsx
  import { useState } from "react";
  import NFTCard from "../Cards/NFTCard";
  import NFTAbi from "@/ABIs/BuidlNFT.json";
  import StakingAbi from "@/ABIs/Staking.json";
  import { useContract, useProvider } from "wagmi";
  import { ethers } from "ethers";

  const StakedNft = ({ smartAccount }) => {
    const provider = useProvider();
    const [rewardBal, setRewardBal] = useState();
    const [tokenId, setTokenId] = useState();
    const [tokenURI, setTokenURI] = useState("");
    const stakingContract = useContract({
      address: StakingAbi.address,
      abi: StakingAbi.abi,
      signerOrProvider: provider,
    });
    const nftContract = useContract({
      address: NFTAbi.address,
      abi: NFTAbi.abi,
      signerOrProvider: provider,
    });

    async function getStaked() {
      if (smartAccount?.address) {
        console.log("Smart Contract Wallet Address:", smartAccount?.address);

        const getStakedNFTs = async () => {
          try {
            const tx = await stakingContract?.stakeTokenId(
              smartAccount?.address
            );
            setTokenId(tx.toNumber());
            console.log(tx.toNumber());
            const tx2 = await nftContract?.tokenURI(tokenId);
            setTokenURI(tx2);
          } catch (err) {
            console.log(err);
          }
        };
        getStakedNFTs();
      }
      if (smartAccount?.address) {
        const getReward = async () => {
          try {
            const reward = await stakingContract?.calculateReward(
              smartAccount?.address
            );
            setRewardBal(ethers.utils.formatUnits(reward, 18));
          } catch (err) {
            console.log(err);
          }
        };
        getReward();
      }
    }
    return (
      <div className="flex flex-col mx-auto text-center">
        <button onClick={getStaked}>See your staked NFTs</button>{" "}
        <div className="mx-auto my-7">
          {tokenURI && rewardBal ? (
            <NFTCard
              url={tokenURI}
              stake={false}
              tokenId={tokenId}
              smartAccount={smartAccount}
            />
          ) : (
            <section className="border p-5 rounded-lg shadow-lg">
              <h1 className="my-5 text-lg">No NFTs Staked !</h1>
            </section>
          )}
        </div>
      </div>
    );
  };

  export default StakedNft;
  ```

  Here

  - We created a new prop called `smartAccount` which will be used to fetch get the address for fetching the staked NFTs.

- Go to `frontend/components/Modal/UnStakedNFT.jsx` and paste the following code:

  ```jsx
  import React, { useState } from "react";
  import NFTAbi from "@/ABIs/BuidlNFT.json";

  import NFTCard from "../Cards/NFTCard";
  import { useContract, useSigner } from "wagmi";

  const UnstakedNft = ({ smartAccount }) => {
    const { data: signer } = useSigner();
    const [nfts, setNfts] = useState([]);
    const nftContract = useContract({
      address: NFTAbi.address,
      abi: NFTAbi.abi,
      signerOrProvider: signer,
    });

    async function getNfts() {
      if (smartAccount?.address) {
        const getNFTs = async () => {
          try {
            const tx1 = await nftContract?.balanceOf(smartAccount?.address);
            const index = tx1.toNumber();

            const txss = await nftContract?.tokenOfOwnerByIndex(
              smartAccount?.address,
              0
            );
            for (let i = 0; i < index; i++) {
              const tx = await nftContract?.tokenOfOwnerByIndex(
                smartAccount?.address,
                i
              );
              const tx2 = await nftContract?.tokenURI(tx.toNumber());

              setNfts([{ tokenId: tx.toNumber(), url: tx2 }]);
            }
            console.log(nfts);
          } catch (err) {
            console.log(err);
          }
        };
        getNFTs();
      }
    }

    return (
      <div className="flex flex-col mx-auto text-center">
        <button onClick={getNfts}>See Your NFTS</button>

        {nfts && console.log(nfts)}
        <h2 className="text-2xl">Your NFTs</h2>
        <div className="flex mx-auto my-7">
          {nfts.map((nft, id) => (
            <NFTCard
              key={id}
              url={nft.url}
              stake={true}
              tokenId={nft.tokenId}
              smartAccount={smartAccount}
            />
          ))}
        </div>
      </div>
    );
  };

  export default UnstakedNft;
  ```

  Here

  - We created a new prop called `smartAccount` which will be used to fetch get the address for fetching the NFTs left to stake.

- Go to `frontend/components/Modal/TokenBal.jsx` and paste the following code:

  ```jsx
  import { useEffect, useState } from "react";
  import TokenAbi from "@/ABIs/BuidlToken.json";
  import StakingAbi from "@/ABIs/Staking.json";
  import { useContract, useProvider } from "wagmi";
  import { ethers } from "ethers";

  const TokenBal = ({ smartAccount }) => {
    const provider = useProvider();
    const [tokenBal, setTokenBal] = useState("0");
    const [rewardBal, setRewardBal] = useState("0");
    const tokenContract = useContract({
      address: TokenAbi.address,
      abi: TokenAbi.abi,
      signerOrProvider: provider,
    });
    const stakingContract = useContract({
      address: StakingAbi.address,
      abi: StakingAbi.abi,
      signerOrProvider: provider,
    });

    useEffect(() => {
      if (smartAccount?.address && stakingContract && tokenContract) {
        const getReward = async () => {
          try {
            const reward = await stakingContract?.calculateReward(
              smartAccount?.address
            );
            setRewardBal(ethers.utils.formatUnits(reward, 18));
          } catch (err) {
            console.log(err);
          }
        };
        const getBalance = async () => {
          try {
            const tokenBalance = await tokenContract?.balanceOf(
              smartAccount?.address
            );

            setTokenBal(ethers.utils.formatEther(tokenBalance));
          } catch (err) {
            console.log(err);
          }
        };
        getReward();
        getBalance();
      }
    }, [smartAccount?.address, stakingContract, tokenContract]);

    return (
      <div className="flex flex-col text-center justify-center ">
        <h2 className="mt-5 text-2xl">Your Tokens</h2>
        <div className="flex mx-auto my-5">
          <section className="border p-5 rounded-lg m-2">
            <h2>Rewards</h2>
            {rewardBal + " BT"}
          </section>
          <section className="border p-5 rounded-lg m-2">
            <h2>Balance</h2>
            {tokenBal + " BT"}
          </section>
        </div>
      </div>
    );
  };

  export default TokenBal;
  ```

  Here

  - We created a new prop called `smartAccount` which will be used to fetch get the address for fetching the token balance and rewards.

---

---

### 7. Change the components in `frontend/pages/index.jsx`

- Go to `frontend/pages/index.jsx` and paste the following code:

  ```jsx
  import Head from "next/head";
  import { useAccount } from "wagmi";
  import Main from "@/components/main";

  export default function Home() {
    const { address } = useAccount();

    return (
      <>
        <Head>
          <title>My staking dapp</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          {address ? (
            <div>
              <Main></Main>
            </div>
          ) : (
            <div className="flex justify-center">
              <section className="px-5 border rounded-lg my-20 shadow-lg bg-[#0000009d]">
                <h2 className="text-2xl my-10">
                  Connect wallet to get started !!
                </h2>
              </section>
            </div>
          )}
        </main>
      </>
    );
  }
  ```

  Here

  - We imported the `Main` component which we created in the previous step.
  - `Main` is used in placed of all other components.

---

---

### 8. Last thing is to change the ABIs in `frontend/ABIs` folder

- Paste the commands in your terminal (on frontend directory)
  - `cd ..`
  - `cd backend`
  - `yarn install`
  - `npx hardhat compile`
- Go to `frontend/ABIs/BuidlNFT.json`
- Change the `address` to the address of the deployed NFT contract.
- Then change the `abi` to the abi of the compiled NFT contract which you can get from `backend/artifacts/contracts/BuidlNFT.sol/BuidlNFT.json` file.
- Go to `frontend/ABIs/BuidlToken.json`
- Change the `address` to the address of the deployed Token contract.
- Then change the `abi` to the abi of the compiled Token contract which you can get from `backend/artifacts/contracts/BuidlToken.sol/BuidlToken.json` file.
- Go to `frontend/ABIs/Staking.json`
- Change the `address` to the address of the deployed Staking contract.
- Then change the `abi` to the abi of the compiled Staking contract which you can get from `backend/artifacts/contracts/BuidlNFT.sol/Staking.json` file.

---

---

# **Congrats🎉 on converting your Staking dApp Gasless**

If you have any doubts,

<p align="center">
<br>
👉👉👉👉👉👉👉👉👉 <a href="https://t.me/+cUyVYxFCxP84N2Q1"><img alt="Telegram Group Link" src="https://img.shields.io/badge/Telegram-1DA1F2?style=for-the-badge&logo=telegram&logoColor=white"/><a> 👈👈👈👈👈👈👈👈👈

</p>

---

---

---
