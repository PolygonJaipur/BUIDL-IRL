import React, { useEffect } from "react";
import NFTCard from "../Cards/NFTCard";
import NFTAbi from "@/ABIs/BuidlNFT.json";
import StakingAbi from "@/ABIs/Staking.json";
import { useAccount, useContract, useSigner } from "wagmi";
import { ethers } from "ethers";

const StakedNft = () => {
  const [rewardBal, setRewardBal] = useState();
  const [tokenId, setTokenId] = useState();
  const [tokenURI, setTokenURI] = useState("");

  useEffect(() => {
    if (address) {
      const getStakedNFTs = async () => {};
      getStakedNFTs();
    }
    if (address) {
      const getReward = async () => {};
      getReward();
    }
  }, [tokenId, address, stakingContract, nftContract]);
  return (
    <div className="flex flex-col mx-auto text-center">
      <h2 className="text-2xl">Your Staked NFTs</h2>
      <div className="mx-auto my-7"></div>
    </div>
  );
};

export default StakedNft;
