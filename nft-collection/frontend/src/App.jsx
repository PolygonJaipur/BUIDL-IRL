import { Web3Button } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import NFT from "./NFT";

export default function App() {
	const { address, isConnected } = useAccount();
	const { disconnect } = useDisconnect();

	useEffect(() => {
		if (isConnected) {
			console.log("Connected to", address);
		}
	}, [isConnected, address]);

	return (
		<div className="App">
			<nav className="header">
				<h1>BUIDL_IRL</h1>
				{isConnected && <Web3Button />}
			</nav>
			<div className="container">
				{isConnected ? <NFT /> : <Web3Button />}
			</div>
			<footer>
				<div className="Logo__Container">
					<img
						className="Logo"
						src="/polygon.svg"
						alt="Polygon Logo"
					/>
					<span>|</span>
					<img
						className="Logo"
						src="/walletconnect.svg"
						alt="WalletConnect Logo"
					/>
				</div>
			</footer>
		</div>
	);
}
