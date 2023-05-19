// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract user {
    address private UserAddress;

    struct User {
        string name;
        string email;
        uint256 bookBalance;
        uint256[] borrowedBooks;
    }

    mapping(address => User) public users;

    event userRegistered(address indexed _user, string _name, string _email);

    constructor(address _userAddress) {
        UserAddress = _userAddress;
    }

    function registerUser(string memory _name, string memory _email) public {
        users[msg.sender] = User(_name, _email, 0, new uint256[](0));
        emit userRegistered(msg.sender, _name, _email);
    }
}
