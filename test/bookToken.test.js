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

   it('getBookDetails should return correct book details, also getBookCopies function works well', async () => {
       await instance.addBook("Shogun", "James Clavell", 5, "69696969");

       const bookId = 1;
       const bookArray = await instance.getBookDetails(bookId);

        const book = {
            title: bookArray[0],
            author: bookArray[1],
            copies: parseInt(bookArray[2].toString()),
            isbn: bookArray[3]
         }

       const expectedBook = {
        title: "Shogun",
        author: "James Clavell",
        copies: 5,    
        isbn: "69696969"
       }
       
       const bookCopies = await instance.getBookCopies(bookId);


       assert.deepEqual(book, expectedBook, "Book details are not correct");
       assert.equal(book.copies, bookCopies, "Book copies are not correct");
   })
})
