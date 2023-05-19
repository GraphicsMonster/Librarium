// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./bookToken.sol";

contract Library {
    address private bookTokenAddress;
    bookToken public bookTokenContract;

    constructor(address _bookTokenAddress) {
        bookTokenAddress = _bookTokenAddress;
        bookTokenContract = bookToken(bookTokenAddress);
    }

    mapping(address => uint256) public bookBalance;
    mapping(address => mapping(uint256 => uint256)) public booksIssued;

    event bookBorrowed(address indexed _borrower, uint256 indexed _bookId);
    event bookReturned(address indexed _borrower, uint256 indexed _bookId);

    function bookBorrow(uint256 _bookId) public {
        require(
            bookTokenContract.getBookCopies(_bookId) > 0,
            "Book does not exist"
        );

        require(
            booksIssued[msg.sender][_bookId] == 0,
            "Book has already been issued by you"
        );

        bookBalance[msg.sender]++;
        booksIssued[msg.sender][_bookId] = block.timestamp;
    }
}
