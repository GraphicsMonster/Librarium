const bookToken = artifacts.require('../contracts/bookToken.sol');

contract('bookToken', (accounts) => {
    let instance;

    beforeEach(async () => {
        instance = await bookToken.new();
    })

    it('should be able to add a book', async () => {
        await instance.addBook("Shogun", "James Clavell", 10, "1234567");

        const bookId = 1;
        const book = await instance.getBookDetails(bookId);

        assert.equal(book.title, "Shogun", "Title is not correct")
        assert.equal(book.author, "James Clavell", "Author is not correct")
        assert.equal(book.copies, "10", "No. of copies is not correct");
        assert.equal(book.isbn, "1234567", "ISBN is not correct");
    })

    it('isBookAvailable should return true if book is available', async () => {
        await instance.addBook("Shogun", "James Clavell", 10, 1234567);

        const bookId = 1;
        const isAvailable = await instance.isBookAvailable(bookId);

        assert.equal(isAvailable, true, "Book is not available");  
   })
})
