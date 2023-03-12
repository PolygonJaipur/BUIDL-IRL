// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "./BuidlToken.sol";

contract Staking is ERC721Holder {
    IERC721 public buidlNFT;
    BuidlToken public buidlToken;

    address owner;

    uint256 public EMISSION_RATE = ((10 ** 18) / (uint256(1 days)));

    mapping(address => uint256) public tokenStakedAt;
    mapping(address => uint256) public stakeTokenId;

    constructor(address nft, address token) {
        buidlNFT = IERC721(nft);
        buidlToken = BuidlToken(token);
    }

    function stakeNFT(uint256 tokenId) external {
        require(buidlNFT.ownerOf(tokenId) == msg.sender, "ERR:NO");
        buidlNFT.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenStakedAt[msg.sender] = block.timestamp;
        stakeTokenId[msg.sender] = tokenId;
    }

    function calculateReward(address staker) public view returns (uint256) {
        require(tokenStakedAt[staker] != 0, "ERR:NS");
        uint256 time = block.timestamp - tokenStakedAt[staker];
        return (time * EMISSION_RATE);
    }

    function unStakeNFT(uint256 tokenId) external {
        require(stakeTokenId[msg.sender] == tokenId, "ERR:NY");
        uint256 rewardAmount = calculateReward(msg.sender);

        buidlNFT.safeTransferFrom(address(this), msg.sender, tokenId);

        buidlToken.mintToken(msg.sender, rewardAmount);

        delete stakeTokenId[msg.sender];
        delete tokenStakedAt[msg.sender];
    }
}
