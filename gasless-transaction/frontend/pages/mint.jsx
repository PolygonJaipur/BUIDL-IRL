import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import NFTAbi from "@/ABIs/BuidlNFT.json";
import { useAccount, useSigner, useContract } from "wagmi";

const Mint = () => {
  const router = useRouter();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const nftContract = useContract({
    address: NFTAbi.address,
    abi: NFTAbi.abi,
    signerOrProvider: signer,
  });

  const mintNFT = async () => {
    try {
      const tx = await nftContract?.safeMint(
        address,
        "https://bafkreih73g4bdfee55w7izme3ryt6imjuh2nykdnxxpwe6eepdqrrkjcjm.ipfs.nftstorage.link/"
      );
      console.log(tx);
      window.alert("NFT Minted");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {address && (
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
