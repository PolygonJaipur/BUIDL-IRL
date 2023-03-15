import { useRouter } from "next/router";
import React from "react";

const Mint = () => {
  const router = useRouter();

  const mintNFT = async () => {};
  return (
    <div>
      <button
        className="p-3 bg-[#ff1] text-black text-lg rounded-xl mx-[50%] min-w-[150px] my-5 hover:scale-105 font-medium"
        onClick={mintNFT}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default Mint;
