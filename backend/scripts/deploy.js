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
  } catch (error) {
    console.error(error);
  }

//   console.log("Sleeping.....");
//   await sleep(40000);

//   try {
//     await hre.run("verify:verify", {
//       address: nft.address,
//       constructorArguments: ["BuidlNFT", "BN"],
//     });
//   } catch (error) {
//     console.error(error);
//   }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});