const LibraryContractFactory = artifacts.require("LibraryContractFactory");
const Library = artifacts.require("Library");
const BookToken = artifacts.require("BookToken");
const User = artifacts.require("User");

module.exports = async function (deployer) {
    await deployer.deploy(LibraryContractFactory);
    await deployer.deploy(Library, "Library Name", "Library Location", "Library Email", "Library Phone", 10);
    await deployer.deploy(BookToken);
    await deployer.deploy(User);
    // Deploying the library contract factory
}