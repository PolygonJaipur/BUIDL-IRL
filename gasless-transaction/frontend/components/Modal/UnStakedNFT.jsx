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
