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
    mapping(uint256 => address) public userAddressById;
    uint256 public totalUsers = 0;

    event userRegistered(address indexed _user, string _name, string _email);

    // messed up big time, turns out we don't need an explicit constructor for the user contract for now.
    // user registration will be handled exclusively by using the registerUser function like it should be.
    // What i did earlier was a massive vulnerability.

    function registerUser(
        address _userAddress,
        string memory _name,
        string memory _email
    ) public {
        require(
            !userExists(_userAddress),
            "User with this address already exists"
        );
        users[_userAddress] = User(_name, _email, 0, new uint256[](0));
        totalUsers = totalUsers + 1;
        userAddressById[totalUsers] = _userAddress;
        emit userRegistered(_userAddress, _name, _email);

        // The user is registered through the constructor primarily, but this function makes it easier to register users through other contracts.
    }

    function setUserBalance(address _userAddress, uint256 _balance) public {
        users[_userAddress].bookBalance = _balance;
    }

    function getUserBalance(
        address _userAddress
    ) public view returns (uint256) {
        return users[_userAddress].bookBalance;
    }

    function setUserHoldsBorrow(address _address, uint256 _bookId) public {
        users[_address].borrowedBooks.push(_bookId);
    }

    function setUserHoldsReturn(address _address, uint256 _bookId) public view {
        uint256[] memory holds = users[_address].borrowedBooks;
        for (uint256 i = 0; i < holds.length; i++) {
            if (holds[i] == _bookId) {
                holds[i] = holds[holds.length - 1];
                delete holds[holds.length - 1];
                break;
            }
        }
    }

    function getUser(address _userAddress) public view returns (User memory) {
        return users[_userAddress];
    }

    function getUsers() public view returns (User[] memory) {
        address temp_address;
        User[] memory _users = new User[](totalUsers);
        for (uint256 i = 0; i < totalUsers; i++) {
            temp_address = userAddressById[i];
            _users[i] = users[temp_address];
        }
        return _users;
    }

    function userExists(address _userAddress) public view returns (bool) {
        if (bytes(users[_userAddress].name).length > 0) {
            return true;
        } else {
            return false;
        }
    }
}
