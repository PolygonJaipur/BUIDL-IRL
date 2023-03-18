import { useEffect, useState } from "react";
import NFT from "./NFT";
import { NavLink, Route, Routes } from "react-router-dom";
import Gallery from "./Gallery";
import Transfer from "./Transfer";

const ReactHooksTutorial = () => {
	const [count, setCount] = useState(0);
	const [text, setText] = useState("John");

	useEffect(() => {
		if (count > 10) {
			alert("Count is greater than 10, resetting to 0...");
			setCount(0);
		}
	}, [count]);

	return (
		<div>
			<h1
				style={{
					marginBottom: "2rem",
				}}
			>
				React Hooks Tutorial
			</h1>
			<div
				className="Buttons__Container"
				style={{
					marginBottom: "2rem",
				}}
			>
				<p
					style={{
						fontSize: "1rem",
						color: "hsla(260, 15%, 75%, 1)",
					}}
				>
					Count: {count}
				</p>
				<button className="btn" onClick={() => setCount(count + 1)}>
					Increment
				</button>
			</div>
			<div className="Input__Container">
				<label>Name: {text}</label>
				<input
					type="text"
					value={text}
					onChange={e => setText(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default function App() {
	const isConnected = false;
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
					<ReactHooksTutorial />
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
