import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

/// Imports required by Biconomy
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";

/// Importing the components
import UnstakedNft from "./Modal/UnstakedNft";
import StakedNft from "./Modal/StakedNft";
import TokenBal from "./Modal/TokenBal";
import Mint from "../pages/mint";

const Main = () => {
  /// State Variables
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [smartAccount, setSmartAccount] = useState(null);
  const [scwAddress, setScwAddress] = useState("");
  const [scwLoading, setScwLoading] = useState(false);
  const activeChainId = ChainId.POLYGON_MUMBAI;

  useEffect(() => {
    if (signer) {
      async function setupSmartAccount() {
        setScwAddress("");
        setScwLoading(true);

        const smartAccount = new SmartAccount(signer.provider, {
          activeNetworkId: activeChainId,
          supportedNetworksIds: [activeChainId],
          networkConfig: [
            {
              chainId: activeChainId,
              dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
            },
          ],
        });
        console.log("wallet", smartAccount);

        const smartAccountss = await smartAccount.init();
        console.info("smartAccount", smartAccountss);
        setScwAddress(smartAccount.address);
        setSmartAccount(smartAccount);
        setScwLoading(false);
      }
      if (!!signer.provider && !!address) {
        setupSmartAccount();
      }
    }
  }, [address, signer]);

  return (
    /// Passing the smartAccount to the components
    <div>
      {scwLoading && <h2>Loading Smart Account...</h2>}
      <h2>Smart Account Address: {scwAddress}</h2>
      <TokenBal smartAccount={smartAccount} />
      <StakedNft smartAccount={smartAccount} />
      <UnstakedNft smartAccount={smartAccount} />
      <Mint smartAccount={smartAccount} />
    </div>
  );
};

export default Main;
