// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./Library.sol";

contract LibraryContractFactory {
    mapping(address => address) public libraries;

    event LibraryCreated(
        address indexed libraryAddress,
        address indexed customerAddress
    );

    function createLibrary() public {
        // Deploy a new instance of the Library contract
        Library newLibrary = new Library(10);
        // Store the library address mapped to the customer address
        libraries[msg.sender] = address(newLibrary);
        // Emit an event to notify the creation of a new library
        emit LibraryCreated(address(newLibrary), msg.sender);
    }

    function getLibrary() public view returns (address) {
        // Retrieve the library address for the calling customer
        return libraries[msg.sender];
    }
}
