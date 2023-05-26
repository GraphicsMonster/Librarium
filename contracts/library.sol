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

    function getbookBalance(
        address _userAddress
    ) public view returns (uint256) {
        return bookBalance[_userAddress];
    }

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

    function addCopies(uint256 _bookId, uint256 _copies) public {
        require(
            bookTokenContract.isBookAvailable(_bookId),
            "Add the book first"
        );

        bookTokenContract.addCopies(_bookId, _copies);
    }

    function bookBorrow(address _userAddress, uint256 _bookId) public {
        require(
            bookTokenContract.isBookAvailable(_bookId),
            "Book does not exist"
        );

        require(
            booksIssued[_userAddress][_bookId] == false,
            "Book has already been issued by you"
        );

        if (bookBalance[_userAddress] == 0) {
            bookBalance[_userAddress] = 1;
        } else {
            bookBalance[_userAddress] += 1;
        }

        booksIssued[_userAddress][_bookId] = true;

        emit bookBorrowed(_userAddress, _bookId);
    }

    function returnBook(uint256 _bookId) public {
        require(
            booksIssued[msg.sender][_bookId] == true,
            "Book has not been issued by you"
        );

        bookBalance[msg.sender] -= 1;
        booksIssued[msg.sender][_bookId] = false;

        emit bookReturned(msg.sender, _bookId);
    }

    function getBorrowedBooks(
        address _address
    ) public view returns (uint256[] memory) {
        uint256[] memory bookIds = new uint256[](bookBalance[_address]);
        uint256 count = 0;

        for (uint256 i = 1; i <= bookTokenContract.totalBooks(); i++) {
            if (booksIssued[_address][i] == true) {
                bookIds[count] = i;
                count++;
            }
        }

        return bookIds;
    }

    // The booksIssued mapping can only take boolean values for whether the user already holds a particular copy of the title.
    // This functionality is used in bookBorrow, bookReturned and getBorrowedBooks functions.
}
