// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

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

    // This is the total number of books in the library's system.

    function addBook(
        string memory _title,
        string memory _author,
        uint256 _copies,
        string memory _isbn
    ) public {
        books[totalBooks + 1] = Book(_title, _author, _copies, _isbn);
        totalBooks++;
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

    function isBookAvailable(uint256 _bookId) public view returns (bool) {
        if (_bookId > totalBooks || _bookId < totalBooks || totalBooks == 0) {
            revert("Book does not exist");
        } else {
            if (books[_bookId].copies > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
}
