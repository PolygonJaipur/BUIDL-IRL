import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";



export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
            <Component {...pageProps} />
      ) : (
        <div className="flex justify-center text-2xl my-10">Loading</div>
      )}
    </>
  );
}
