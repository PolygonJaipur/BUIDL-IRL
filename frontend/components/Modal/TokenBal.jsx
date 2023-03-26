import React, { useEffect, useState } from "react";
import TokenAbi from "@/ABIs/BuidlToken.json";
import StakingAbi from "@/ABIs/Staking.json";
import { useAccount, useContract, useProvider } from "wagmi";
import { ethers } from "ethers";

const TokenBal = () => {
  const { address } = useAccount();
  const [tokenBal, setTokenBal] = useState("0");
  const [rewardBal, setRewardBal] = useState("0");

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
  const getReward = async () => {
    try {
      const reward = await stakingContract?.calculateReward(address);
      setRewardBal(ethers.utils.formatUnits(reward, 18));
    } catch (err) {
      console.log(err);
    }
};
const getBalance = async () => {
  try {
    const tokenBalance = await tokenContract?.balanceOf(address);

    setTokenBal(ethers.utils.formatEther(tokenBalance));
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (address && stakingContract && tokenContract) {
    const getReward = async () => {
      try {
        const reward = await stakingContract?.calculateReward(address);
        setRewardBal(ethers.utils.formatUnits(reward, 18));
      } catch (err) {
        console.log(err);
      }
    };
    const getBalance = async () => {
      try {
        const tokenBalance = await tokenContract?.balanceOf(address);
        setTokenBal(ethers.utils.formatEther(tokenBalance));
      } catch (err) {
        console.log(err);
      }
      
      getReward();
      getBalance();
    };
  }
}, [address, stakingContract, tokenContract]);


  return (
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
  );
};

export default TokenBal;
