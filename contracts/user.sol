// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract user {
    address public UserAddress;

    struct User {
        string name;
        string email;
        uint256 bookBalance;
        uint256[] borrowedBooks;
    }

    mapping(address => User) public users;

    event userRegistered(address indexed _user, string _name, string _email);

    constructor(
        address _userAddress,
        string memory _name,
        string memory _email
    ) {
        require(
            !userExists(_userAddress),
            "User with this address already exists"
        );

        UserAddress = _userAddress;
        users[_userAddress] = User(_name, _email, 0, new uint256[](0));
    }

    function setUserBalance(address _userAddress, uint256 _balance) public {
        users[_userAddress].bookBalance = _balance;
    }

    function getUserBalance(
        address _userAddress
    ) public view returns (uint256) {
        return users[_userAddress].bookBalance;
    }

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    function registerUser(
        address _userAddress,
        string memory _name,
        string memory _email
    ) public {
        require(
            !userExists(_userAddress),
            "User with this address already exists"
        );
        emit userRegistered(_userAddress, _name, _email);
        users[_userAddress] = User(_name, _email, 0, new uint256[](0));

        // The user is registered through the constructor primarily, but this function makes it easier to register users through other contracts.
    }

    function userExists(address _userAddress) public view returns (bool) {
        if (bytes(users[_userAddress].name).length > 0) {
            return true;
        } else {
            return false;
        }
    }
}
