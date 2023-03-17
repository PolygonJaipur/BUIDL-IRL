import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import ABI from "./contracts/ABI.json";

const CONTRACT_ADDRESS = "0xf8Ef6084E0734e0359D91C82D3D23194fC832dA0";

const getCloudflareURL = url =>
	`https://cloudflare-ipfs.com/ipfs/${url?.replace("ipfs://", "")}`;

const truncateAddress = (addr, size = 4) =>
	`${addr.slice(0, size / 2)}...${addr.slice(-size)}`;

const TransferSelector = () => {
	return <div>Transfer Selector</div>;
};

const TransferComponent = ({ id }) => {
	const { data: signer } = useSigner();
	const { address } = useAccount();

	const [data, setData] = useState(null);
	const [transferAddress, setTransferAddress] = useState(null);
	const [isTransferring, setIsTransferring] = useState(false);
	const [currentOwner, setCurrentOwner] = useState(null);

	const { data: tokenURI } = useContractRead({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		functionName: "getTokenURI",
		args: [id],
	});

	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
		signerOrProvider: signer,
	});

	const handleAddressChange = event => {
		setTransferAddress(event.target.value);
	};

	const handleTransfer = () => {
		setIsTransferring(true);
		contract
			.isApprovedForAll(address, CONTRACT_ADDRESS)
			.then(approved => {
				if (!approved) {
					contract
						.setApprovalForAll(CONTRACT_ADDRESS, true)
						.then(res => {
							contract
								.transfer(transferAddress, id)
								.then(res => {
									setIsTransferring(false);
									setTransferAddress(null);
								})
								.catch(err => {
									console.log(err);
									setIsTransferring(false);
								});
						})
						.catch(err => {
							console.log(err);
							setIsTransferring(false);
						});
				} else {
					contract
						.transfer(transferAddress, id)
						.then(res => {
							setIsTransferring(false);
							setTransferAddress(null);
						})
						.catch(err => {
							console.log(err);
							setIsTransferring(false);
						});
				}
			})
			.catch(err => {
				console.log(err);
				setIsTransferring(false);
			});
	};

	useEffect(() => {
		id &&
			fetch(getCloudflareURL(tokenURI))
				.then(res => res.json())
				.then(data => setData(data));
		id && contract.ownerOf(id).then(res => setCurrentOwner(res));
	}, [id, contract]);

	return (
		<div className="NFT__Container">
			{data && <h2>{data.name}</h2>}
			<div className="Divider" />
			<div className="Image__Container">
				{data && data.image && (
					<img src={getCloudflareURL(data.image)} alt={data.name} />
				)}
			</div>
			<div className="Divider" />
			<div className="Input__Wrapper">
				<div className="Input__Container">
					<label>Transfer To</label>
					<input
						type="text"
						name="address"
						value={transferAddress || ""}
						placeholder="e.g. 0x12...2334"
						onChange={handleAddressChange}
					/>
				</div>
			</div>
			<div className="Divider" />
			<div className="Buttons__Container">
				<p>
					Owned by:{" "}
					<b>
						{currentOwner !== null &&
						currentOwner?.toLowerCase() === address.toLowerCase()
							? `You`
							: currentOwner !== null &&
							  truncateAddress(currentOwner?.toLowerCase())}
					</b>
				</p>
				<button className="btn" onClick={handleTransfer}>
					{isTransferring ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							width="24"
							height="24"
							viewBox="0 0 100 100"
							preserveAspectRatio="xMidYMid"
						>
							<circle
								cx="50"
								cy="50"
								fill="none"
								stroke="currentColor"
								strokeWidth="8"
								r="35"
								strokeDasharray="164.93361431346415 56.97787143782138"
							>
								<animateTransform
									attributeName="transform"
									type="rotate"
									repeatCount="indefinite"
									dur="1s"
									values="0 50 50;360 50 50"
									keyTimes="0;1"
								></animateTransform>
							</circle>
						</svg>
					) : (
						"Transfer"
					)}
				</button>
			</div>
		</div>
	);
};

const Transfer = () => {
	const { id } = useParams();

	return id !== undefined ? (
		<TransferComponent id={id} />
	) : (
		<TransferSelector />
	);
};

export default Transfer;
