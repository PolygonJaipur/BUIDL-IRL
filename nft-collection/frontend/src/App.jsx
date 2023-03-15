import { Web3Button } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";

const CONTRACT_ADDRESS = "0x8b7fbA9aD358EE10D37FC0ad6390C0FdF375B883";

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
			</nav>
			<div className="container">
				<Web3Button />
			</div>
		</div>
	);
}
