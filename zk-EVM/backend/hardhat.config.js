require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const zkEVM_POLYGON_SCAN_KEY = process.env.POLYGON_SCAN_KEY;

module.exports = {
  solidity: "0.8.18",
  networks: {
    zkEVM: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      zkEVM: zkEVM_POLYGON_SCAN_KEY,
    },
    customChains: [
      {
        network: "zkEVM",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/"
        }
      }
    ]
  },
};
