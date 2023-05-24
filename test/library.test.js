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

    it('Should be able to fetch user details(Through library contract)', async () => {
        //await LibraryInstance.registerUser("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", "Devansh", "dgupta0069@gmail.com");
        
        const userDetails = await LibraryInstance.getUserDetails("0xb28c9ade2882319974aaa9e860cd5633febcc4cc");
        assert.equal(userDetails.name, "Devansh", "User name is not correct");
        assert.equal(userDetails.email, "dgupta0069@gmail.com", "User email is not correct");  
        // Check if the user details are correct
        // The user address is the key to the mapping
        // This test case remains to be fixed. The user address is not being stored in the mapping correctly. Will do later tonight.
    })

    it('Should be able to register a new user(through library contract)', async () => {

        await LibraryInstance.registerUser("0xea50f13f44b42b82d87470d4710215b48864a506", "Test", "dgupta0069@gmail.com");
        // Register a new user through the registerUser function defined inside library contract

        const userDetails = await LibraryInstance.getUserDetails("0xea50f13f44b42b82d87470d4710215b48864a506");
        // Fetch the user details of the newly registered user
        assert.equal(userDetails.name, "Test", "User name is not correct");
        assert.equal(userDetails.email, "dgupta0069@gmail.com", "User email is not correct");
        // Check if the user details are correct
        // works now. Great!
    })

    it('Should be able to borrow books for a user', async () => {

        const BookToken = await bookToken.new();
        
        await BookToken.addBook("Harry Potter", "J.K. Rowling", "1234567890", "3");
        await BookToken.addBook("Shogun", "James Clavell", "1234567891", "1");
        await BookToken.addBook("The Lord of the Rings", "J.R.R. Tolkien", "1234567892", "2");
        // Add new books to the library

        const shogun_book_id = BookToken.getBookId.call("1234567890");
        const harry_potter_book_id = BookToken.getBookId("1234567891");
        const lotr_book_id = BookToken.getBookId("1234567892");
        // Get the book ids of the books added to the library

        await LibraryInstance.bookBorrow(shogun_book_id);
        await LibraryInstance.bookBorrow(harry_potter_book_id);
        await LibraryInstance.bookBorrow(lotr_book_id);

        assert.equal(LibraryInstance.bookBalance["0xb28c9ade2882319974aaa9e860cd5633febcc4cc"], 3,  "Book balance is not correct");

    })
})