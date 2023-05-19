import * as dotenv from "dotenv";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";

dotenv.config();

const gas = "auto";
const gasPrice = "auto";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.6",
      },
    ],
  },
  defaultNetwork: "zk",
  zksolc: {
    version: "1.3.8",
    compilerSource: "binary",
    settings: {
      libraries: {}, // optional. References to non-inlinable libraries
      isSystem: false, // optional.  Enables Yul instructions available only for zkSync system contracts and libraries
      forceEvmla: false, // optional. Falls back to EVM legacy assembly if there is a bug with Yul
      optimizer: {
        enabled: true, // optional. True by default
        mode: '3' // optional. 3 by default, z to optimize bytecode size
      }
    }
  },
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
      accounts:
        [
          "0xbe7afe3c7af59cc6c0139b6e20b5ef2d90a42f7552b83a9cedbfa3ef54e3bfb1",
        ],
      gas: gas,
      gasPrice: gasPrice,
    },
    zk: {
      url: "https://zksync2-mainnet.zksync.io", // The testnet RPC URL of zkSync Era network.
      accounts:
        [
          "0xbe7afe3c7af59cc6c0139b6e20b5ef2d90a42f7552b83a9cedbfa3ef54e3bfb1",
        ],
      ethNetwork: "mainnet", // The Ethereum Web3 RPC URL, or the identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: "",
  },
};

export default config;
