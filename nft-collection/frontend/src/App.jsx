import { Web3Button } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import NFT from "./NFT";
import { NavLink, Route, Routes } from "react-router-dom";
import Gallery from "./Gallery";
import Transfer from "./Transfer";

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
				<div className="Link__Container">
					<NavLink
						to="/"
						className={({ isActive, isPending }) =>
							`Link${
								isPending
									? "--pending"
									: isActive
									? "--active"
									: ""
							}`
						}
					>
						Create
					</NavLink>
					<NavLink
						to="/gallery"
						className={({ isActive, isPending }) =>
							`Link${
								isPending
									? "--pending"
									: isActive
									? "--active"
									: ""
							}`
						}
					>
						Gallery
					</NavLink>
					{isConnected && <Web3Button />}
				</div>
			</nav>
			<div className="container">
				{isConnected ? (
					<Routes>
						<Route path="/" element={<NFT />} />
						<Route path="gallery/:id?" element={<Gallery />} />
						<Route path="transfer/:id" element={<Transfer />} />
					</Routes>
				) : (
					<Web3Button />
				)}
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
