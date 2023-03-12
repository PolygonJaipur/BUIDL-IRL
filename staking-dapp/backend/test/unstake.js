const hre = require("hardhat");
const { expect } = require("chai");
const { loadFixture, time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("ethers");

describe("Unstaking Function", function () {
    async function fixture() {
        const [deployer, user1] = await hre.ethers.getSigners();

        const nft = await hre.ethers.getContractFactory("BuidlNFT");
        const nftContract = await nft.deploy("BuidlNFT", "BN");
        await nftContract.deployed();

        const token = await hre.ethers.getContractFactory("BuidlToken");
        const tokenContract = await token.deploy("BuidlToken", "BT");
        await tokenContract.deployed();

        const staking = await hre.ethers.getContractFactory("Staking");
        const stakingContract = await staking.deploy(nftContract.address, tokenContract.address);
        await stakingContract.deployed();

        await nftContract.connect(deployer).safeMint(user1.address, "").then((val) => {
            console.log("NFT Minted");
        });

        await nftContract.connect(user1).setApprovalForAll(stakingContract.address, true).then((val) => {
            console.log("NFT Approved");
        });

        await stakingContract.connect(user1).stakeNFT(0).then((val) => {
            console.log("NFT Staked");
        });


        return { deployer, user1, nftContract, tokenContract, stakingContract };
    }

    it("Should unstake the NFT", async function () {
        const { user1, nftContract, tokenContract, stakingContract } = await loadFixture(fixture);

        await time.increase(3600);

        const rewardAmount = await stakingContract.calculateReward(user1.address);
        console.log("Reward Amount: ", rewardAmount.toString());


        // const rewardAmountAfter = await stakingContract.calculateReward(user1.address);
        // console.log("Reward Amount After: ", rewardAmountAfter.toString());

        await stakingContract.connect(user1).unStakeNFT(0);

        expect(await nftContract.balanceOf(user1.address)).to.equal(1);
        expect(await nftContract.balanceOf(stakingContract.address)).to.equal(0);
        expect(await nftContract.ownerOf(0)).to.equal(user1.address);
        // expect(await tokenContract.balanceOf(user1.address)).to.equal(rewardAmount);
    });

});