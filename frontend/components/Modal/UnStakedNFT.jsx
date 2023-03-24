import React, { useEffect, useState } from "react";
import NFTAbi from "@/ABIs/BuidlNFT.json";
import NFTCard from "../Cards/NFTCard";
import { useAccount, useContract, useSigner } from "wagmi";

const UnstakedNft = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [nfts, setNfts] = React.useState([]);
  const nftContract = useContract({
    address: NFTAbi.address,
    abi: NFTAbi.abi,
    signerOrProvider: signer,
  });

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

  useEffect(() => {
    if (address) {
      const getNFTs = async () => {};
      getNFTs();
    }
  }, [address, nftContract]);

  return (
    <div className="flex flex-col mx-auto text-center">

      <h2 className="text-2xl">Your NFTs</h2>
      <div className="flex flex-wrap mx-auto my-7"></div>
      {nfts.map((nft, id) => (
          <NFTCard key={id} url={nft.url} stake={true} tokenId={nft.tokenId} />
        ))}
    </div>
    
  );
};

export default UnstakedNft;
