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
    const stakingContractInterface = new ethers.utils.Interface(StakingAbi.abi);

    const data1 = nftContractInterface.encodeFunctionData("setApprovalForAll", [
      StakingAbi.address,
      true,
    ]);
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
