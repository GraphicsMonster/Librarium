const bookToken = artifacts.require('bookToken');
const Library = artifacts.require('library');
const user = artifacts.require('user');

contract('Library', async () => {

    let LibraryInstance;

    beforeEach(async () => {
        const BookToken = await bookToken.new();
        // Deploy bookToken contract first

        const userInstance = await user.new("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", "Devansh", "dgupta0069@gmail.com");
        // Deploy user contract

        LibraryInstance = await Library.new(BookToken.address, userInstance.address);
        // Deploy Library contract with bookToken contract address as parameter
    })

    it('Should be able to register a user(Through library contract)', async () => {
        //await LibraryInstance.registerUser("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", "Devansh", "dgupta0069@gmail.com");
        
        const userDetails = await LibraryInstance.getUserDetails("0xb28c9ade2882319974aaa9e860cd5633febcc4cc");
        assert.equal(userDetails.name, "Devansh", "User name is not correct");
        assert.equal(userDetails.email, "dgupta0069@gmail.com", "User email is not correct");  
        // Check if the user details are correct
        // The user address is the key to the mapping
        // This test case remains to be fixed. The user address is not being stored in the mapping correctly. Will do later tonight.
    })
})