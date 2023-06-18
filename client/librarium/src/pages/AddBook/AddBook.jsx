import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AddBook.css'

const data = {
    name: '',
    author: '',
    copies: 0,
    isbn: ''
}


const AddBook = () => {

    const {id} = useParams();
    const [libraryExists, setLibraryExists] = useState(false);

    useEffect(() => {
        const checkLibraryExists = async() => {
            const response = await fetch(`http://localhost:3000/api/library/${id}`);
            setLibraryExists(response.ok);
        };

        checkLibraryExists();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        data.name = document.getElementById('book-name').value;
        data.author = document.getElementById('book-author').value;
        data.copies = document.getElementById('book-copies').value;
        data.isbn = document.getElementById('book-isbn').value;
    
        await postData();
    }
    
    const postData = async() => {
        try {
            const url = `http://localhost:3000/api/library/${id}/addbook`
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
            if(response.ok) {
                const data = await response.json();
                console.log(data);
            }
            else {
                console.log('Failed to add book');
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    if(!libraryExists) {
        return (
            <div className='addbook-error'>
                <p className='addbook-error-text'>Library does not exist</p>
            </div>
        )
    }
        
    
    return (
        <>
        <div className='addbook-form'>
            <div className='addbook-form-container'>
                <div className='row'>
                    <div className='col-25 book-name'>Book Name</div>
                    <div className='col-75 book-input'>
                        <input type='text' id='book-name' name='name' placeholder='Enter Book Name' />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-25 book-author'>Author</div>
                    <div className='col-75 book-input'>
                        <input type='text' id='book-author' name='author' placeholder='Enter Author Name' />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-25 book-copies'>Copies</div>
                    <div className='col-75 book-input'>
                        <input type='number' id='book-copies' name='copies' placeholder='Enter Number of Copies' />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-25 book-isbn'>ISBN</div>
                    <div className='col-75 book-input'>
                        <input type='text' id='book-isbn' name='isbn' placeholder='Enter ISBN' />
                    </div>
                </div>

                <div className='submit-button'>
                    <button onClick={handleSubmit} type='submit' className='submit-button'>Add Book</button>
                </div>
            </div>
        </div>

        <div className='addbook-footer'>
            <p className='addbook-footer-text'>Back to Library <Link to='/library/dashboard'>Dashboard</Link> </p>
        </div>
        </>
    )

    }

export default AddBook