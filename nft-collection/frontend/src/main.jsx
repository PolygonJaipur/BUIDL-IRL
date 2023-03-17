import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Define project id from cloud.walletconnect.com
const projectId = "f19cac97ba60e7b23ce645d9a6e286f4";

// Configure chains
const chains = [polygonMumbai];

// Configure wagmi client provider
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

// Create wagmi client
const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider,
});

// Create ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<WagmiConfig client={wagmiClient}>
				<App />
				<Web3Modal
					themeVariables={{
						"--w3m-accent-color": "#8247e5",
						"--w3m-background-color": "#8247e5",
					}}
					projectId={projectId}
					ethereumClient={ethereumClient}
				/>
			</WagmiConfig>
		</BrowserRouter>
	</React.StrictMode>
);
