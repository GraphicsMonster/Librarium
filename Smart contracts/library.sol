// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./bookToken.sol";

contract Library {
    address private bookTokenAddress;
    bookToken private bookTokenContract;

    constructor(address _bookTokenAddress) {
        bookTokenAddress = _bookTokenAddress;
        bookTokenContract = bookToken(bookTokenAddress);
    }

    mapping(address => uint256) public bookBalance;
    mapping(address => mapping(uint256 => uint256)) public booksIssued;

    event bookBorrowed(address indexed _borrower, uint256 indexed _bookId);
    event bookReturned(address indexed _borrower, uint256 indexed _bookId);
}
