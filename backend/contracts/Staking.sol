pragma solidity 0.8.18;


import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "./BUIDLToken.sol";

contract Staking is ERC721Holder {
    /// @notice NFT contract
    IERC721 public buidlNFT;
    //ye iss contract ke liye variable hai 

    /// @notice Token contract
    BUIDLToken public buidlToken;
    //ye iss token ke liye variable hai 


    /// @dev owner of the contract
    address owner;

    /// @notice Emission rate per second
    uint256 public EMISSION_RATE = ((10 ** 18) / (uint256(1 days)));

    /// @notice Staking start time
    mapping(address => uint256) public tokenStakedAt;

    /// @notice Token ID of the staked NFT
    mapping(address => uint256) public stakeTokenId;

    /// @notice Constructor
    /// @param nft  NFT contract address
    /// @param token Token contract address
    constructor(address nft, address token) {
        buidlNFT = IERC721(nft);
        buidlToken = BUIDLToken(token);
    }
    function stakeNFT(uint256 tokenId) external {
        require(buidlNFT.ownerOf(tokenId) == msg.sender, "ERR:NO");
        buidlNFT.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenStakedAt[msg.sender] = block.timestamp;
        stakeTokenId[msg.sender] = tokenId;
    }
    function calculateReward(address staker) public view returns (uint256) {
        require(tokenStakedAt[staker] != 0, "ERR:NS");
        //NS : Not Staked 
        uint256 time = block.timestamp - tokenStakedAt[staker];
        return (time * EMISSION_RATE);
    }
    function unStakeNFT(uint256 tokenId) external {
        require(stakeTokenId[msg.sender] == tokenId, "ERR:NY");
        uint256 rewardAmount = calculateReward(msg.sender);

        buidlNFT.safeTransferFrom(address(this), msg.sender, tokenId);

        buidlToken.mintTokens(msg.sender, rewardAmount);

        delete stakeTokenId[msg.sender];
        delete tokenStakedAt[msg.sender];
    }
}

