// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./library.sol";

contract LibraryContractFactory {
    mapping(uint256 => address) public libraries;
    // Maps a unique integer to the library address

    uint256 public totalLibraries = 0;
    // Keeps track of the total number of libraries created by this contract

    event LibraryCreated(
        address indexed libraryAddress,
        uint256 indexed libraryId,
        string name,
        string location,
        string email,
        string phone,
        uint256 maxholds
    );

    function createLibrary(
        string memory name,
        string memory location,
        string memory email,
        string memory phone,
        uint256 maxholds
    ) public {
        // Deploy a new instance of the Library contract
        Library newLibrary = new Library(
            name,
            location,
            email,
            phone,
            maxholds
        );
        // Store the library address mapped to its unique address in this contract
        totalLibraries = totalLibraries + 1;
        libraries[totalLibraries] = address(newLibrary);
        // Emit an event to notify the creation of a new library
        emit LibraryCreated(
            address(newLibrary),
            totalLibraries,
            name,
            location,
            email,
            phone,
            maxholds
        );
    }

    function getLibraryAddress(
        uint256 library_id
    ) public view returns (address) {
        // Retrieve the library address for the calling customer
        return libraries[library_id];
    }
}
