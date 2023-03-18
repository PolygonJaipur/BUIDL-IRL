# BUIDL-IRL

![1D13C407-7B37-4572-9B81-FD92C807A269](https://user-images.githubusercontent.com/79016290/225668652-832dd0e7-2aeb-412d-81ae-9ceceab56d00.GIF)

_Created by [Ayush Mangal](https://twitter.com/0xayushM)_

**gm gm gm**

## Before we begin
![image](https://user-images.githubusercontent.com/26746725/226090712-0f4969b0-cf4d-4188-b455-91f655fe6f60.png)

[This is what we will be buidling!](https://buidl-irl.vercel.app/)


## Get Started!

-   Register for the series [here.](https://lu.ma/buidl-irl)

-   Give this repo a star ⭐️
-   Fork the Git Repo
    ![Screenshot 2023-03-18 at 12 19 33 PM](https://user-images.githubusercontent.com/79016290/226090202-ed4f4c0e-47a7-4921-bc03-5e170c53b0dd.png)
    THEN
    ![Screenshot 2023-03-18 at 12 13 05 PM](https://user-images.githubusercontent.com/79016290/226089921-5056c755-c81e-4085-a27d-79e9743d7a41.png)

-   Open your terminal and paste the following code:

```bash
git clone https://github.com/{username}/BUIDL-IRL.git -b nft-collection-frontend-codealong
cd BUIDL-IRL
```

-   Open the folder in your preferred IDE.

-   Open the same terminal and paste the following code:

```bash
yarn install
```

-   One final step is to create an nft.storage account and get your API key. You
    can do that [here](https://nft.storage/).


## CODE CODE CODE!! 🧑‍💻

- Firstly lets take a look at [Web3Modal's docs](https://docs.walletconnect.com/2.0/web3modal/react/installation) to figure how to get setup.
- Notice how there is a need for a projectID. Now this is what we're gonna use in web3modal for WalletConnect to know that its _you_ who's setting up your dApp. For this, lets head over to https://cloud.walletconnect.com
![image](https://user-images.githubusercontent.com/26746725/226126583-880cf95d-baaf-4ca6-ab51-95b9cb71104f.png)
- Then lets connect with wallet. This should bring up the dashboard for you.
![image](https://user-images.githubusercontent.com/26746725/226126777-27b10f3f-c10f-4ba5-b38c-dc68e26fa948.png)
- Click on new project and give it a name. There you go! Finally, theres the infamous project ID we're looking for 💪
![image](https://user-images.githubusercontent.com/26746725/226127681-7b568fdd-950a-49b5-ba06-5593810db9c9.png)
- Copy this and head over to your code. Now time to get in action. Paste this code in main.jsx
```jsx
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

const chains = [polygonMumbai]
const projectId = 'YOUR_PROJECT_ID'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
```
What this does is, it gets your `ethereumClient` setup for `wagmi` (and `ethers.js` behind the hood) to use
- Coming to jsx, we have to figure out a way to get `wagmi` to use this `wagmiClient`. For this, we have a handy-dandy Component called `WagmiConfig`. Lets wrap our app with this. But wait, before we do that, we need to also pass our `projectId` and `ethereumClient` to Web3Modal. Lets get these two done together.
```jsx
<WagmiConfig client={wagmiClient}>
    <App />
    <Web3Modal
        themeVariables={{
            "--w3m-accent-color": "#8247e5",
            "--w3m-background-color": "#8247e5",
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
    />
</WagmiConfig>
```

- Great going, now that our `main.jsx` is setup, its time to head over to `App.jsx`. Here we need to take care of one thing, we need users to be able to login with WalletConnect through Web3Modal. Also to see which account is connected, lets use `useAccount` hook from `wagmi`. To do that, we can use this:
```jsx
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
```

- Now we need to check if the user is already connected and if they are, we just load the routes for them to navigate around our dApp, else lets show the Web3Button.
```jsx
const { address, isConnected } = useAccount();
```
and
```jsx
<div className="container">
    {isConnected ? (
        <Routes>
            <Route path="/" element={<NFT />} />
            <Route path="gallery/:id?" element={<Gallery />} />
            <Route path="transfer/:id" element={<Transfer />} />
        </Routes>
    ) : (
        <Web3Button />
    )}
</div>
```
- Awesome! Now we have a way for people to login with their fav wallet and get connected easily!

- Now its time to setup a way for people to mint an NFT! Exciting stuff 👀
- Lets go to `NFT.jsx` for this
- Now this is where things get interesting. We will be doing a lot of things for this. Lets start with the imports
```jsx
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
```
- `useAccount` as we know is gonna give us the connected user's address, `useContract` helps us interact with the contract, `useContractRead` is a special variant of `useContract` which helps us execute contract read functions easily, and lastly, `useSigner` to give us the Signer for the connected user.
- Lets put these imports to use!
```jsx
const { address } = useAccount();
const { data: signer } = useSigner();
const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    signerOrProvider: signer,
});
const { data: supply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    functionName: "totalSupply",
});
```
- Keep in mind we also need the `CONTRACT_ADDRESS` and `ABI` for this to work, we have defined it outside our App function.
- Another important thing we're gonna do is use `nft.storage` to upload our NFT to ipfs. (You can get your key from https://nft.storage
```jsx
const client = new NFTStorage({ token: NFT_STORAGE_KEY });
```
- Great! Now lets plan out what we're gonna do when the user clicks the Upload NFT Button
    - Upload the title, description and image to nft.storage
    - Get the ipfs Hash
    - Interact with our smart contract to send this hash over to our smart contract to upload it as an ERC721 token.
    - Once its uploaded, show it in our Gallery (the `main` branch has code for our Gallery but try to figure this one out by yourself first!)
- Phew, thats a lot of stuff going on. Lets code it!
```jsx
const uploadFile = () => {
    setIsMinting(true);
    client
        .store({
            name: title,
            description,
            image: selectedFile,
        })
        .then(result => {
            const ipfsUrl = result.url;
            console.log("IPFS url:", ipfsUrl);
            try {
                contract.safeMint(address, ipfsUrl).then(res => {
                    console.log(
                        "Minted Successfully: https://mumbai.polygonscan.com/tx/" +
                            res.hash
                    );
                    setIsMinting(false);
                    // navigate(`/gallery/${supply.toNumber()}`);
                });
            } catch (e) {
                console.log(e);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            setIsMinting(false);
        });
};
```
- Now lets call the proper functions and logic on what to show and when to show it.
- THERE YOU GO!! Great going, you've successfully created a dApp to mint an NFT 🥳


## What you will get out of this?

-   [**Learn**]() about the **_Polygon Network_** and the solutions it provides.
-   [**Experience**]() of building **_full-stack dApp(s)_** on the Polygon
    Network.
-   [**Connect**]() with the [_Polygon Guild Jaipur_]() community.
-   [**SWAGs**]() escpecially for the participants.
-   [**Opportunity**]() for getting **_Lens Handle_** and **_.polygon_** domain.

Here is the criteria for getting the SWAGS and Lens Handle:

![Screenshot 2023-03-17 at 11 55 22 AM](https://user-images.githubusercontent.com/79016290/225829396-ac811249-6423-44a9-88aa-c8377c1cc6e4.png)

°There are more swags and opportunities for the participants who will complete
the whole workshop series.

## How to get help?

Make sure to join the Telegram Group for any queries

<p align="center">
<br>
👉👉👉👉👉👉👉👉👉 <a href="https://t.me/+cUyVYxFCxP84N2Q1"><img alt="Telegram Group Link" src="https://img.shields.io/badge/Telegram-1DA1F2?style=for-the-badge&logo=telegram&logoColor=white"/><a> 👈👈👈👈👈👈👈👈👈

</p>

---

---

---
