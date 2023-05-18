// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract bookToken {
    struct Book {
        string title;
        string author;
        uint256 copies;
        string isbn;
    }

    mapping(string => Book) books;
    uint256 public totalBooks;
}
