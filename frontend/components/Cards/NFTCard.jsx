import React, { useEffect, useState } from "react";
import Image from "next/image";
import NFTAbi from "@/ABIs/BuidlNFT.json";
import StakingAbi from "@/ABIs/Staking.json";
import { useAccount, useContract, useSigner } from "wagmi";

const NFTCard = ({ url, stake, tokenId }) => {
  const [nft, setNft] = useState({
    name: "",
    image: "",
    desc: "",
    tokenID: tokenId,
  });
  const stakeNft = async () => {};
  const unStakeNft = async () => {};
  useEffect(() => {}, [tokenId, url]);

  return (
    <div>
      {stake ? (
        <div>
          <section className="text-center max-w-fit border px-3  rounded-md border-[#ffffff82] shadow-lg mx-2 hover:scale-105">
            <h2 className="text-2xl my-2">{nft.name}</h2>
            <Image src={nft.image ? nft.image : "/deafult.jpg"} alt={nft.name} width={200} height={400} />
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
            <Image src={nft.image ? nft.image : "/deafult.jpg"} alt={nft.name} width={200} height={400} />
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
