// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./bookToken.sol";
import "./user.sol";

contract Library {
    address private bookTokenAddress;
    address private userAddress;
    //The purpose of bookTokenAddress is to store the address of the bookToken contract.
    bookToken public bookTokenContract;
    user public userContract;

    constructor(address _bookTokenAddress, address _userAddress) {
        bookTokenAddress = _bookTokenAddress;
        bookTokenContract = bookToken(bookTokenAddress);
        // This is how we can access the functions of the bookToken contract.
        userAddress = _userAddress;
        userContract = user(_userAddress);
        // This is how we can access the functions of the user contract.
    }

    mapping(address => uint256) public bookBalance;
    mapping(address => mapping(uint256 => bool)) public booksIssued;

    event bookBorrowed(address indexed _borrower, uint256 indexed _bookId);
    event bookReturned(address indexed _borrower, uint256 indexed _bookId);

    function registerUser(
        address _userAddress,
        string memory name,
        string memory email
    ) public {
        userContract.registerUser(_userAddress, name, email);
    }

    function getUserDetails(
        address _userAddress
    ) public view returns (user.User memory) {
        return userContract.getUser(_userAddress);
    }

    function bookBorrow(uint256 _bookId) public {
        require(
            bookTokenContract.getBookCopies(_bookId) > 0,
            "Book does not exist"
        );

        require(
            booksIssued[msg.sender][_bookId] == false,
            "Book has already been issued by you"
        );

        bookBalance[msg.sender]++;
        booksIssued[msg.sender][_bookId] = true;

        emit bookBorrowed(msg.sender, _bookId);
    }

    function returnBook(uint256 _bookId) public {
        require(
            booksIssued[msg.sender][_bookId] == true,
            "Book has not been issued by you"
        );

        bookBalance[msg.sender]--;
        booksIssued[msg.sender][_bookId] = false;

        emit bookReturned(msg.sender, _bookId);
    }

    function getBorrwedBooks() public view returns (uint256[] memory) {
        uint256[] memory bookIds = new uint256[](bookBalance[msg.sender]);
        uint256 count = 0;

        for (uint256 i = 1; i <= bookTokenContract.totalBooks(); i++) {
            if (booksIssued[msg.sender][i] == true) {
                bookIds[count] = i;
                count++;
            }
        }

        return bookIds;
    }

    // The booksIssued mapping can only take boolean values for whether the user already holds a particular copy of the title.
    // This functionality is used in bookBorrow, bookReturned and getBorrowedBooks functions.
}
