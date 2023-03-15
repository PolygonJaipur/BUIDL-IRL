import React, { useState } from "react";
import ABI from "./contracts/ABI.json";
import { useContract } from "wagmi";

const CONTRACT_ADDRESS = "0x8b7fbA9aD358EE10D37FC0ad6390C0FdF375B883";

const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY;

const NFT = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = event => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const uploadFile = () => {
		const formData = new FormData();
		formData.append("File", selectedFile);

		fetch("https://api.nft.storage/upload", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${NFT_STORAGE_KEY}`,
				"Content-Type": "application/json",
			},
			body: formData,
		})
			.then(response => response.json())
			.then(result => {
				console.log("IPFS url:", "ipfs://" + result.value.cid);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: ABI.abi,
	});
	return (
		<div className="NFT__Container">
			{isFilePicked ? (
				<div class="File__Container">
					<img src={URL.createObjectURL(selectedFile)}></img>
					<div className="File__Metadata">
						<p>
							<label>Filename:</label> {selectedFile.name}
						</p>
						<p>
							<label>Size:</label>{" "}
							{Math.round(selectedFile.size / 1024)} kb
						</p>
					</div>
				</div>
			) : (
				<h2>Select a file to create NFT</h2>
			)}
			<div className="Input__Container">
				<input type="file" name="file" onChange={changeHandler} />
				{isFilePicked && (
					<button className="btn" onClick={uploadFile}>
						Create NFT
					</button>
				)}
			</div>
		</div>
	);
};

export default NFT;
