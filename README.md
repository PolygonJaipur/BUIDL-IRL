# BUIDL-IRL

# Gasless Transactions

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

### 2. Installing the Biconomy SDK

- Run the following command in the terminal

  ```bash
  yarn add @biconomy/core-types @biconomy/smart-account @biconomy/web3-auth
  ```

  This will install the Biconomy SDK in your project.

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

- Create a new function named `Main` and export it.

  ```javascript
  export default function Main() {
    return <div></div>;
  }
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

---
