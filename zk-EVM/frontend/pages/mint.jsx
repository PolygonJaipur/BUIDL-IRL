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

      const txResponse = await smartAccount.sendGaslessTransaction({
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
