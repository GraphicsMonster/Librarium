// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
import "./user.sol";

contract bookToken {
    struct Book {
        string title;
        string author;
        uint256 copies;
        string isbn;
    }

    mapping(uint256 => Book) public books;
    // This gives birth to the idea behind a unique bookId for each book which is essentially the order in which each book was registered in the library's systems.
    uint256 public totalBooks;

    mapping(address => uint256[]) public userBooks;
    // A seperate database of books for every user. This is to make it easier to keep track of which books are issued to which user.

    event bookAdded(
        uint256 indexed _bookId,
        string _title,
        string _author,
        uint256 _copies,
        string _isbn
    );

    function addBook(
        string memory _title,
        string memory _author,
        uint256 _copies,
        string memory _isbn
    ) public {
        books[totalBooks + 1] = Book(_title, _author, _copies, _isbn);
        totalBooks++;
        emit bookAdded(totalBooks, _title, _author, _copies, _isbn);
    }

    function getBookDetails(uint256 _bookId) public view returns (Book memory) {
        if (_bookId > totalBooks || _bookId < 0 || totalBooks == 0) {
            revert("Book does not exist");
        } else {
            return books[_bookId];
        }

        // Testing has led me to find out that this function returns not a struct but a string array of the struct's values.
        // To optimize for usage, we can convert the returned array's required values into string and then parse it into whatever type we want.
        // This is done in the bookToken.test.js file
        // I will leave this here for reference purposes.
    }

    function getBookCopies(uint256 _bookId) public view returns (uint256) {
        if (_bookId > totalBooks || _bookId < 0 || totalBooks == 0) {
            revert("Book does not exist");
        } else {
            return books[_bookId].copies;
        }
    }

    function getBookId(string memory _isbn) public view returns (uint256) {
        for (uint256 id = 1; id <= totalBooks; id++) {
            if (
                keccak256(abi.encode(books[id].isbn)) ==
                keccak256(abi.encode(_isbn))
            ) {
                return id;
            }
        }

        return 0;
        //Something is wrong with this function. It's not actually comparing the isbn with the isbn of the book for some reason.
        // That's because
    }

    function addCopies(uint256 _bookId, uint256 _copies) public {
        if (_bookId > totalBooks || _bookId < 0 || totalBooks == 0) {
            revert("Book does not exist");
        } else {
            books[_bookId].copies += _copies;
        }
    }

    function isBookAvailable(uint256 _bookId) public view returns (bool) {
        if (_bookId > totalBooks || totalBooks == 0) {
            // removed the condition _bookId < 0 because it's redundant
            revert("Book does not exist");
        } else {
            if (books[_bookId].copies > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    function getBooks() public view returns (Book[] memory) {
        Book[] memory _books = new Book[](totalBooks);
        for (uint256 id = 1; id <= totalBooks; id++) {
            _books[id - 1] = books[id];
        }
        return _books;
    }
}
