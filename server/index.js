const express = require('express');
const app = express();

const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545')
// Don't forget to update this with the correct localhost address of the running blockchain network


// This file is server side, so we need to use the web3 library to connect to the blockchain
// After connecting to the blockchain we will fetch data from the blockchain and send it to the client side
// This script serves as the intermediary between the client side and the blockchain.
// Let's code!


const BookToken = require('../build/contracts/bookToken.json');
const User = require('../build/contracts/user.json');
const Library = require('../build/contracts/library.json');
// We need to import the json files of the contracts we want to interact with

const bookTokenContractABI = BookToken.abi;
const userContractABI = User.abi;
const libraryContractABI = Library.abi;
// We need to import the abi of the contracts we want to interact with

const bookTokenContractAddress = BookToken.networks['5777'].address;
const userContractAddress = User.networks['5777'].address;
const libraryContractAddress = Library.networks['5777'].address;
// We need to import the address of the contracts we want to interact with

const bookTokenContract = new web3.eth.Contract(bookTokenContractABI, bookTokenContractAddress);
const userContract = new web3.eth.Contract(userContractABI, userContractAddress);
const libraryContract = new web3.eth.Contract(libraryContractABI, libraryContractAddress);
// We need to create instances of the contracts we want to interact with

app.get('/api/bookToken/:id', async (req, res) => {
    try {
        const bookId = req.params.id;

        const bookDetails = await bookTokenContract.getBookDetails(bookId);
        // We are fetching the book details from the blockchain
        const response = {
            bookId: bookId,
            name: bookDetails[0],
            author: bookDetails[1],
            copies: bookDetails[2],
            isbn: bookDetails[3],
        }

        res.json(response);
        // We are sending the book details to the client side
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong while fetching book details" });
        // Handling the case where something goes wrong whilst fetching book details
    }
})

// This is the endpoint for fetching book details. The client side will send a request to this endpoint with the book id as a parameter
// The server side will fetch the book details from the blockchain and send it to the client side



app.get('api/library/:id/books', async (req, res) => {
    const libraryId = req.params.id;
    const librarycontractABI = ''


    //Oh fuck this is confusing. I think the way i have made the contracts communicate is pretty absurd lmao. 
    //ok I think I know what is going wrong here. I should create a system such that each library has its own unique id in my database.
    //for that i also need a database which i am yet to set up. and then in the database i keep 
})

app.get('api/library/:id/users', async (req, res) => {
    const libraryId = req.params.id;
    const libraryAddress = '';
    const librarycontract = new web3.eth.Contract(libraryContractABI, libraryAddress);

    const userContractId = librarycontract.userContract;
    const bookTokenContract = librayrcontract.bookTokenContract;

    librarycontract.userContract.methods.getUsers().call((error, users) => {

        if (error) {
            // Handling the case where something goes wrong whilst fetching userdata
            res.status(500).json({ error: "Something went wrong while fetching user data" });
        }
        else {
            res.json({ users: { users } });
        }
    })
})