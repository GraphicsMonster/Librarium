const bookToken = artifacts.require('bookToken');
const Library = artifacts.require('library');
const user = artifacts.require('user');
const { BigNumber } = require('bignumber.js');

contract('Library', async () => {

    let LibraryInstance;
    let BookToken;
    let userInstance;
    let maxHolds = 10;

    beforeEach(async () => {
        BookToken = await bookToken.new();
        // Deploy bookToken contract first

        userInstance = await user.new("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", "Devansh", "dgupta0069@gmail.com");
        // Deploy user contract

        LibraryInstance = await Library.new(BookToken.address, userInstance.address, maxHolds);
        // Deploy Library contract with bookToken contract address as parameter

        await BookToken.addBook("Harry Potter", "J.K. Rowling", "3", "1234567890");
        await BookToken.addBook("Shogun", "James Clavell", "1", "1234567891");
        await BookToken.addBook("The Lord of the Rings", "J.R.R. Tolkien", "2", "1234567892");
        // Add new books to the library

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

        let shogun_book_id = new BigNumber(await BookToken.getBookId("1234567890"));
        console.log(shogun_book_id.toNumber());
        let harry_potter_book_id = new BigNumber(await BookToken.getBookId("1234567891"));
        console.log(harry_potter_book_id.toNumber());
        let lotr_book_id = new BigNumber(await BookToken.getBookId("1234567892"));
        console.log(lotr_book_id.toNumber());
        // Get the book ids of the books added to the library


        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", shogun_book_id.toNumber());
        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", harry_potter_book_id.toNumber());
        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", lotr_book_id.toNumber());

        console.log(await LibraryInstance.getUserDetails("0xb28c9ade2882319974aaa9e860cd5633febcc4cc"));
        // Shouldn't return undefined. But it does.

        const bookBalance = await LibraryInstance.getbookBalance("0xb28c9ade2882319974aaa9e860cd5633febcc4cc");
        assert.equal(bookBalance, 3, "Book balance is not correct");
        // Hell yeah baby this works now. Great!

        // The test fails again. Something is not right with the bookBorrow function. Will fix it tonight. [ FIXED ]
        // More testing has revealed that something is not right with the getBookId function. [FIXED]
        // Everything was almost alright. I just had to add the await keyword before the function call.

        // The reason the test was failing was because you can't access bookBalance directly. You have to define and use a getter function.

    })

    it('Checking if the books were correctly initiated(registered) in the Network', async () => {
        const total = (new BigNumber(await BookToken.totalBooks.call())).toNumber();
        assert.equal(total, 3, "Total books is not correct");
    })

    it("Checking if the getBorrowedBooks function works", async () => {

        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 1);
        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 2);
        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 3);
        // Borrowing the same books we borrowed in the other test case.

        const Ids = await LibraryInstance.getBorrowedBooks("0xb28c9ade2882319974aaa9e860cd5633febcc4cc");
        let actualId = Ids.map(id => id.toNumber());
        const balance = new BigNumber(await LibraryInstance.getbookBalance("0xb28c9ade2882319974aaa9e860cd5633febcc4cc")).toNumber();
        actualId = actualId.slice(0, balance);
        console.log(actualId);

        // Even though these are just test cases, limiting the amount of hardcoding of data as much as possible will definitely pay off.

        assert.deepEqual(actualId, [1, 2, 3], "Book IDs is not correct");

        // Fixed. Let's goooooo!
    })

    it("Testing the return function", async () => {

        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 1);
        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 2);
        await LibraryInstance.bookBorrow("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 3);
        // Borrowing the same books we borrowed in the other test case.

        console.log(await LibraryInstance.getUserDetails("0xb28c9ade2882319974aaa9e860cd5633febcc4cc"));
        // logs expected Details

        let borrowedBooks = await LibraryInstance.getBorrowedBooks("0xb28c9ade2882319974aaa9e860cd5633febcc4cc");
        let balance = new BigNumber(await LibraryInstance.getbookBalance("0xb28c9ade2882319974aaa9e860cd5633febcc4cc")).toNumber();
        borrowedBooks = borrowedBooks.map(id => id.toNumber());
        borrowedBooks = borrowedBooks.slice(0, balance);
        assert.deepEqual(borrowedBooks, [1, 2, 3], "Book IDs is not correct");
        // Checking if the books were borrowed correctly

        await LibraryInstance.bookReturn("0xb28c9ade2882319974aaa9e860cd5633febcc4cc", 1);
        // Returning the first book

        console.log(await LibraryInstance.getUserDetails("0xb28c9ade2882319974aaa9e860cd5633febcc4cc"));
        // logs expected Details

        borrowedBooks = await LibraryInstance.getBorrowedBooks("0xb28c9ade2882319974aaa9e860cd5633febcc4cc");
        balance = new BigNumber(await LibraryInstance.getbookBalance("0xb28c9ade2882319974aaa9e860cd5633febcc4cc")).toNumber();
        borrowedBooks = borrowedBooks.map(id => id.toNumber());
        borrowedBooks = borrowedBooks.slice(0, balance);
        assert.deepEqual(borrowedBooks, [2, 3], "Book IDs is not correct");
        // Checking if the book was returned correctly.
    })
})