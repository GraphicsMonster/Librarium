// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./bookToken.sol";
import "./user.sol";

contract Library {
    address private bookTokenAddress;
    address private userAddress;
    // bookTokenAddress is to store the address of the bookToken contract.
    bookToken public bookTokenContract;
    user public userContract;

    uint256 maxHolds;

    // Maximum number of hold the library allows a user to have at a time.

    constructor(uint256 _maxHolds) {
        bookTokenContract = new bookToken();
        bookTokenAddress = address(bookTokenContract);
        // This is how we can access the functions of the bookToken contract.
        userContract = new user();
        userAddress = address(userContract);
        // This is how we can access the functions of the user contract.

        maxHolds = _maxHolds;
    }

    mapping(address => uint256) public bookBalance;

    function getbookBalance(
        address _userAddress
    ) public view returns (uint256) {
        return bookBalance[_userAddress];
    }

    mapping(address => mapping(uint256 => bool)) public booksIssued;

    event bookBorrowed(
        address indexed _borrower,
        uint256 indexed _bookId,
        uint256 _bookBalance
    );
    event bookReturned(
        address indexed _borrower,
        uint256 indexed _bookId,
        uint256 indexed _bookBalance
    );

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

    function updateUserBalance(address _userAddress, uint256 _balance) public {
        userContract.setUserBalance(_userAddress, _balance);
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

        userContract.setUserBalance(_userAddress, bookBalance[_userAddress]);
        // Update the user's book balance in the user contract struct.

        if (bookBalance[_userAddress] > maxHolds) {
            revert("You have exceeded the maximum number of holds");
        } else {
            userContract.setUserHoldsBorrow(_userAddress, _bookId);
        }
        // Add the bookId to the user's borrowedBooks array.

        emit bookBorrowed(_userAddress, _bookId, bookBalance[_userAddress]);
    }

    function bookReturn(address _userAddress, uint256 _bookId) public {
        require(bookBalance[_userAddress] > 0, "You have no holds");

        require(
            booksIssued[_userAddress][_bookId] == true,
            "Book has not been issued by you"
        );

        bookBalance[_userAddress] -= 1;
        booksIssued[_userAddress][_bookId] = false;

        userContract.setUserBalance(_userAddress, bookBalance[_userAddress]);
        // Update the user's book balance in the user contract struct.

        userContract.setUserHoldsReturn(_userAddress, _bookId);
        // Remove the bookId from the user's borrowedBooks array.

        emit bookReturned(_userAddress, _bookId, bookBalance[_userAddress]);
    }

    function getBorrowedBooks(
        address _address
    ) public view returns (uint256[] memory) {
        uint256[] memory bookIds = new uint256[](maxHolds);
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
