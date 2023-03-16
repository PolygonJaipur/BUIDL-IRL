
# BUIDL-IRL DAY 02 NFT STAKING DAPP

## ....🎉 You all deserve a pat on the back for making this far 🎉.... 

What are we going to build now ?

In this tutorial we will be integarting NFT staking contract with NextJs.

### Tech Stack Used

- NextJS
- Wagmi
- Ethers.js
- WalletConnect
- Tailwind CSS

### Prerequisites

- [Metamask Installed as extension in your Browser](https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/)

- [Nodejs](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/) and [YARN](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) Installed in your system

- [Wagmi](https://wagmi.sh)

- [Wallet Connect](https://walletconnect.com/)

- [Knowledge of Git and GitHub](https://www.geeksforgeeks.org/ultimate-guide-git-github/?ref=gcse)

- [Install VS CODE](https://code.visualstudio.com/docs/setup/windows) or Any other IDE 

- [Tailwind CSS](https://tailwindcss.com/)

## Let's start building

### 1. Setting up the project

- Open your terminal and run the following commands

  - `git clone https://github.com/PolygonJaipur/BUIDL-IRL.git`
  - `cd BUIDL-IRL`
  - `git checkout staking-dapp`
  - `cd frontend`
  - `yarn install`
  
These commands in the same order will install all the dependencies for building.
- Create `.env` file in the `frontend` directory. Get project Id from [here](https://cloud.walletconnect.com/sign-in)

```
NEXT_PUBLIC_WEB3_PROJECT_ID = "Your Web3 Project ID"
```


> So our development environment is ready 🚀🚀

### 2. Adding Wallet connection

- Go to `pages/_api.js`

- Create a new Wagmi client

```
const chains = [polygonMumbai];
const projectId = process.env.NEXT_PUBLIC_WEB3_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

```

- Wrap your components with wagmi and walletconnect provider

```
 <WagmiConfig client={wagmiClient}>
          <Navbar />
          <Component {...pageProps} />
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
</WagmiConfig>
```
> You have now succefully wrapped your app with wagmi and rainbow kit 

- Add connect wallet button in Navbar

- Go to `components/Navbar`

- Import Connect Wallet

```
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
...
return (
...
 <ConnectButton
        chainStatus="icon"
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
);
}
```

> You can change the connect wallet appreance and functionalities from [here](https://www.rainbowkit.com/docs/connect-button) 

### 3. Adding ABIs
- Go to ABIs folder and copy paste your smart contract address and abi in .json files

- You can find ABI on [Polygon Scan Mumbai](https://mumbai.polygonscan.com/)
  
```
{
  "address": "Contract Address",
  "abi":[]
}
```

### 4. Working on main page

- First we will import the different components for main page

```
import TokenBal from "@/components/Modal/TokenBal";
import StakedNft from "@/components/Modal/StakedNft";
import UnstakedNft from "@/components/Modal/UnstakedNft";
```

- Then we will fetch the connected wallet address using wagmi

```
const { address } = useAccount();
```

- We will use a conditional operator on address i.e if address exists we will show main components or we will display "Connect Wallet".

```
 <main>
        {address ? (
          <div>
            <TokenBal />
            <StakedNft />
            <UnstakedNft />
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
```

### 5. Working on Token Metric
In this component we will display the total reward and the balance of a user.For this we will use BuidlToken and Staking contract.

- To use contracts we will use wagmi `useContract` hook

```
const provider = useProvider();
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
```

- For getting rewards we will make a getReward function

```
 const getReward = async () => {
        try {
          const reward = await stakingContract?.calculateReward(address);
          setRewardBal(ethers.utils.formatUnits(reward, 18));
        } catch (err) {
          console.log(err);
        }
  };
```
- For getting rewards we will make a getBalance function

```
const getBalance = async () => {
        try {
          const tokenBalance = await tokenContract?.balanceOf(address);

          setTokenBal(ethers.utils.formatEther(tokenBalance));
        } catch (err) {
          console.log(err);
        }
   };
```

- For displaying both we will use 

```
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
```

### 6. Fetching all NFTs
In this we will try to display all the user owned NFTs in our Dapp

- We will be using BuidlNft contract for this 

```
 const nftContract = useContract({
    address: NFTAbi.address,
    abi: NFTAbi.abi,
    signerOrProvider: signer,
  });
```

- To fetch all NFTs we will use getNFTs function

```
 const getNFTs = async () => {
        try {
          const tx1 = await nftContract?.balanceOf(address);
          const index = tx1.toNumber();
          for (let i = 0; i < index; i++) {
            const tx = await nftContract?.tokenOfOwnerByIndex(address, i);
            const tx2 = await nftContract?.tokenURI(tx.toNumber());
            setNfts((prev) => [...prev, { tokenId: tx.toNumber(), url: tx2 }]);
          }
        } catch (err) {
          console.log(err);
        }
   };
```
- To display NFT we will pass it into NFTCard Components with `stake={true}`

```
return(
....
 {nfts.map((nft, id) => (
          <NFTCard key={id} url={nft.url} stake={true} tokenId={nft.tokenId} />
        ))}
 ...
 );   
```
### 6. Fetching staked NFTs
In this we will try to display the staked NFTs in our Dapp

- We will be using BuidlNft and Staking contract for this 

```
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
```

- To fetch all NFTs we will use getStakedNFTs function

```
 const getStakedNFTs = async () => {
        try {
          const tx = await stakingContract?.stakeTokenId(address);
          setTokenId(tx.toNumber());
          console.log(tx.toNumber());
          const tx2 = await nftContract?.tokenURI(tokenId);
          setTokenURI(tx2);
        } catch (err) {
          console.log(err);
        }
      };
```
- To display NFT we will pass it into NFTCard Components with `stake={true}` with a condition i.e if reward is undefined then it will display noNFTs displayed else it will display the NFT with `stake={false}`.  

```
return(
....
 {tokenURI && rewardBal ? (
          <NFTCard url={tokenURI} stake={false} tokenId={tokenId} />
        ) : (
          <section className="border p-5 rounded-lg shadow-lg">
            <h1 className="my-5 text-lg">No NFTs Staked !</h1>
          </section>
   )}  
```

### 7. Making NFT Card component

- We will be using BuidlNft and Staking contract for this 

```
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
```
- To fetch NFT metadata 

```
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
```

- To stake  NFT

```
 const stakeNft = async () => {
    try {
      const approve = await nftContract?.isApprovedForAll(
        address,
        StakingAbi.address
      );
      console.log(approve);
      if (!approve) {
        const tx1 = await nftContract?.setApprovalForAll(
          StakingAbi.address,
          true
        );
      }
      setTimeout(async () => {
        const tx = await stakingContract?.stakeNFT(nft.tokenID);
        console.log(tx);
        window.alert("NFT Stake Successful");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
```

- To unstake NFT

```
const unStakeNft = async () => {
    try {
      const tx = await stakingContract?.unStakeNFT(nft.tokenID);
      console.log(tx);
      const approve = await nftContract?.setApprovalForAll(
        StakingAbi.address,
        false
      );
      console.log(tx);
      window.alert("NFT Unstake Successful");
    } catch (err) {
      console.log(err);
    }
  };
```

- To diplay NFT 

```
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
```

### 8. Deploy your app on vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

> Now you have successfully integarted your smart contracts with frontend.
## Congratulation 🥳
