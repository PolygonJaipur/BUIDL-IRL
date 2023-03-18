// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BuidlNFT is ERC721, ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address owner;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        owner = msg.sender; // msg.sender is the address of the person who deployed the contract
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner"); // msg.sender is the address of the person who called the function BUT WHAT ABOUT OWNER? it is the address of the person who deployed the contract
        _;
    }

    // mintNFT() is a function that mints a token to a specific address
    function mintNFT(address to, string memory uri) external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current(); // current() returns the current value of the counter
        _tokenIdCounter.increment(); // increment() increments the counter by 1
        _safeMint(to, tokenId); // _safeMint() is a function of ERC721, what is safeMint? it is a function that mints a token to a specific address
        _setTokenURI(tokenId, uri); // _setTokenURI() is a function of ERC721URIStorage, what is setTokenURI? it is a function that sets the tokenURI of a specific token
    }

    // transferNFT() is a function that transfers a token to a specific address
    function transferNFT(uint256 tokenID, address to) external {
        safeTransferFrom(msg.sender, to, tokenID); //  it is a function that transfers a token to a specific address
    }

    // Overiddes required by solidity

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId); //
    } // _burn() is a function of ERC721, what is burn? it is a function that burns a token, what burn means? it means that the token is destroyed

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    } // tokenURI() is a function of ERC721URIStorage, what is tokenURI? it is a function that returns the tokenURI of a specific token

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
