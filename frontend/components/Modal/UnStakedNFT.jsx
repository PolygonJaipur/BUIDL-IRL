import React, { useEffect, useState } from "react";
import NFTAbi from "@/ABIs/BuidlNFT.json";
import NFTCard from "../Cards/NFTCard";
import { useAccount, useContract, useSigner } from "wagmi";

const UnstakedNft = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (address) {
      const getNFTs = async () => {};
      getNFTs();
    }
  }, [address, nftContract]);

  return (
    <div className="flex flex-col mx-auto text-center">
      <h2 className="text-2xl">Your NFTs</h2>
      <div className="flex mx-auto my-7"></div>
    </div>
  );
};

export default UnstakedNft;
