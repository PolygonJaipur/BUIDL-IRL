const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  try {
    const NFT = await ethers.getContractFactory("BuidlNFT");
    const nft = await NFT.deploy("BuidlNFT", "BN");
    await nft.deployed();
    console.log("Contract address:", nft.address);

    const TOKEN = await ethers.getContractFactory("BUIDLToken");
    const token = await TOKEN.deploy("BUIDLToken", "BT");
    await token.deployed();
    console.log("Contract address:", token.address);

    const STAKING = await ethers.getContractFactory("Staking");;
    const staking = await STAKING.deploy(nft.address, token.address);
    await staking.deployed();
    console.log("Contract address:", staking.address);
  
  console.log("Sleeping.....");
  await sleep(60000);

    await hre.run("verify:verify", {
      address: nft.address,
      constructorArguments: ["BuidlNFT", "BN"],
    });
    await hre.run("verify:verify", {
      address: token.address,
      constructorArguments: ["BUIDLToken", "BT"],
    });
    await hre.run("verify:verify", {
      address: staking.address,
      constructorArguments: [nft.address, token.address],
    });
  } catch (error) {
    console.error(error);
  }

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});