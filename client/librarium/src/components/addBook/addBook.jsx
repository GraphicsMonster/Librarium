import React, {useState} from 'react'
import './addBook.css'

// This is the form the library will use to add books to the network.
// It will be a simple form with two fields: book ID and book title
// The book ID will be a unique identifier for each book
// I will export the main component and a function to get the data from the form.

const AddBook = () =>  {
  return (
    <div className='addBook'>
        <div className='addBook__form'>
            <div className='row'>
                <div className='col-25 book-id'>Unique Book ID</div>
                <div className='col-75 book-id-input'>
                    <input type='text' id='book-id' name='book-id' placeholder='Enter Book ID' />
                </div>
            </div>
            <div className='row'>
                <div className='col-25 book-title'>Book Title</div>
                <div className='col-75 book-title-input'>
                    <input type='text' id='book-title' name='book-title' placeholder='Enter Book Title' />
                </div>
            </div>
            <div className='row'>
                <div className='col-25 book-author'>Book Author</div>   
                <div className='col-75 book-author-input'>
                    <input type='text' id='book-author' name='book-author' placeholder='Enter Book Author' />
                </div>
            </div>

            <div className='row'>
                <div className='col-25 book-isbn'>ISBN</div>   
                <div className='col-75 book-isbn-input'>
                    <input type='text' id='book-isbn' name='book-isbn' placeholder='Enter Book isbn' />
                </div>
            </div>

            <div className='submit-button'>
                <button onClick={onSubmit} type='submit'id='addBook-form' className='submit-btn'>Check records and add</button>
            </div>
        </div>
    </div>
  )
}

let data = {}
const onSubmit = () => {
      document.getElementById("addBook-form").addEventListener("click", function(event){
          event.preventDefault()

          const book_id = document.getElementById("book-id").value;
          const book_title = document.getElementById("book-title").value;
          const book_author = document.getElementById("book-author").value;
          const isbn = document.getElementById("isbn").value;

          data = {book_id, book_title};
      })
}

const getBookData = () => {
  return data;
}

export default AddBook;
export {getBookData};
