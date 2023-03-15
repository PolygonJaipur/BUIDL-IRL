import "@/styles/globals.css";
import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "@/components/Navbar";

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! }), publicProvider()]
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My Staking Dpp",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      ) : (
        <div className="flex justify-center text-2xl my-[50%]">Loading</div>
      )}
    </>
  );
}
