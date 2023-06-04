// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./Library.sol";

contract LibraryContractFactory {
    mapping(uint256 => address) public libraries;
    // Maps a unique integer to the library address

    uint256 public totalLibraries = 0;
    // Keeps track of the total number of libraries created by this contract

    event LibraryCreated(
        address indexed libraryAddress,
        uint256 indexed libraryId
    );

    function createLibrary() public {
        // Deploy a new instance of the Library contract
        Library newLibrary = new Library(10);
        // Store the library address mapped to its unique address in this contract
        totalLibraries = totalLibraries + 1;
        libraries[totalLibraries] = address(newLibrary);
        // Emit an event to notify the creation of a new library
        emit LibraryCreated(address(newLibrary), totalLibraries);
    }

    function getLibrary(uint256 library_id) public view returns (address) {
        // Retrieve the library address for the calling customer
        return libraries[library_id];
    }
}
