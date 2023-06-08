const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Web3 = require('web3');
// Update the provider URL to connect to the local Ethereum node
const web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
const web3 = new Web3(web3Provider);
// Don't forget to update this with the correct localhost address of the running blockchain network


// This file is server side, so we need to use the web3 library to connect to the blockchain
// After connecting to the blockchain we will fetch data from the blockchain and send it to the client side
// This script serves as the intermediary between the client side and the blockchain.
// Let's code!

const LibraryContractFactory = require('../build/contracts/libraryContractFactory.json');
const BookToken = require('../build/contracts/bookToken.json');
const User = require('../build/contracts/user.json');
const Library = require('../build/contracts/library.json');
// We need to import the json files of the contracts we want to interact with


const libraryContractFactoryABI = LibraryContractFactory.abi;
const bookTokenABI = BookToken.abi;
const userABI = User.abi;
const libraryABI = Library.abi;
// We need to import the abi of the contracts we want to interact with

const libraryContractFactoryAddress = LibraryContractFactory.networks['5777'].address;
// We need to import the address of the contracts we want to interact with

const libraryContractFactory = new web3.eth.Contract(libraryContractFactoryABI, libraryContractFactoryAddress);
// Creating an instance of the library contract factory so that we can interact with it

app.use(bodyParser.json());
// this makes json bodies to get parsed and then compared in our routes\

app.use(bodyParser.urlencoded({ extended: true }));
// this makes url encoded bodies to get parsed and then compared in our routes\

const senderAddress = '0x6a590fe2f684421aab85220fedd19561409798f6';

app.post('/api/library/create', async (req, res) => {
    try {
        const { name, location, email, phone, maxhold } = req.body;
        // Fetching library details from request body

        await libraryContractFactory.methods.createLibrary(name, location, email, phone, maxhold).send({ from: senderAddress, gas: 5000000 });
        // Creating a new library contract on the blockchain

        res.json({ message: "Library created successfully" });
    }
    catch (error) {
        console.error("An error occured while creating library:", error);
        res.status(500).json({ error: "Something went wrong while creating library" });
    }
})
// This is the endpoint for creating a new library. The client side will send a request to this endpoint with the library details in the request body


app.get('/api/library/count', async (req, res) => {
    try {
        const libraryCount = await libraryContractFactory.methods.getTotalLibraries().call();
        // Fetching library count from the blockchain

        res.json({ libraryCount: libraryCount });
    }
    catch (error) {
        console.error("An error occured while fetching library count:", error);
        res.status(500).json({ error: "Something went wrong while fetching library count" });
    }
})
// This is the endpoint for fetching the total number of libraries on the blockchain



// Library specific routes start here:

app.get('/api/library/:id', async (req, res) => {
    try {
        const libraryId = req.params.id;
        // We are fetching the library id from the request parameters

        const totalLibraries = await libraryContractFactory.methods.getTotalLibraries().call();
        // We are fetching the total number of libraries on the blockchain

        if (libraryId >= totalLibraries || libraryId < 0 || isNaN(libraryId)) {
            res.status(400).json({ error: "Invalid library id" });
            return;
        }

        const libraryAddress = await libraryContractFactory.methods.getLibraryAddress(libraryId).call();
        // This fetches the address of the library we are interested in from the blockchain

        const libraryContract = new web3.eth.Contract(libraryABI, libraryAddress);
        // We are creating an instance of the library contract we are interested in

        const libraryDetails = await libraryContract.methods.getLibraryDetails().call();

        const response = {
            libraryId: libraryId,
            name: libraryDetails[0],
            location: libraryDetails[1],
            email: libraryDetails[2],
            phone: libraryDetails[3],
            maxhold: libraryDetails[4],
        }
        res.json(response);
        // sending library details to the client side
    }
    catch (error) {
        console.error("An error occured while fetching library details:", error);
        res.status(500).json({ error: "Something went wrong while fetching library details" });
    }
})

app.post('/api/library/:id/addBook', async (req, res) => {

    try {
        const libraryId = req.params.id;

        const totalLibraries = await libraryContractFactory.methods.getTotalLibraries().call();
        // We are fetching the total number of libraries on the blockchain

        if (libraryId >= totalLibraries || libraryId < 0 || isNaN(libraryId)) {
            res.status(400).json({ error: "Invalid library id" });
            return;
        }

        const libraryAddress = await libraryContractFactory.methods.getLibraryAddress(libraryId).call();
        const libraryContract = new web3.eth.Contract(libraryABI, libraryAddress);

        const { name, author, copies, isbn } = req.body;

        await libraryContract.methods.addBook(name, author, copies, isbn).send({ from: senderAddress, gas: 5000000 });

        res.json({ message: "Book added successfully" });
    }
    catch (error) {
        console.error("An error occured while adding book:", error);
        res.status(500).json({ error: "Something went wrong while adding book" });
    }
})

app.post('/api/library/:id/registeruser', async (req, res) => {
    try {
        const libraryId = req.params.id;

        const totalLibraries = await libraryContractFactory.methods.getTotalLibraries().call();
        // We are fetching the total number of libraries on the blockchain
        if (libraryId >= totalLibraries || libraryId < 0 || isNaN(libraryId)) {
            res.status(400).json({ error: "Invalid library id" });
            return;
        }
        // We are fetching the total number of libraries on the blockchain
        const libraryAddress = await libraryContractFactory.methods.getLibraryAddress(libraryId).call();

        const libraryContract = new web3.eth.Contract(libraryABI, libraryAddress);

        const { address, name, email } = req.body;

        await libraryContract.methods.registerUser(address, name, email).send({ from: senderAddress });
        //user is registered on the blockchain

        res.json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("An error occured while registering user:", error);
        res.status(500).json({ error: "Something went wrong while registering user" });
    }
})

app.get('/api/library/:lib_Id/bookToken/:book_Id', async (req, res) => {
    try {
        const LibraryId = req.params.lib_Id;
        const bookId = req.params.book_Id;
        // We are fetching the library id and book id from the request parameters

        const totalLibraries = await libraryContractFactory.methods.getTotalLibraries().call();
        // We are fetching the total number of libraries on the blockchain

        if (LibraryId >= totalLibraries || LibraryId < 0 || isNaN(LibraryId)) {
            res.status(400).json({ error: "Invalid library id" });
            return;
        }

        const libraryContractAddress = await libraryContractFactory.methods.getLibrary(LibraryId).call();
        // This fetches the address of the library we are interested in from the blockchain

        const libraryContract = new web3.eth.Contract(libraryContractABI, libraryContractAddress);
        // We are creating an instance of the library contract we are interested in

        const bookDetails = await libraryContract.bookTokenContract.methods.getBook(bookId).call();
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



app.get('/api/library/:id/books', async (req, res) => {

    try {
        const libraryId = req.params.id;

        const totalLibraries = await libraryContractFactory.methods.getTotalLibraries().call();
        // We are fetching the total number of libraries on the blockchain

        if (libraryId >= totalLibraries || libraryId < 0 || isNaN(libraryId)) {
            res.status(400).json({ error: "Invalid library id" });
            return;
        }

        const libraryAddress = await libraryContractFactory.methods.getLibrary(libraryId).call();
        const librarycontract = new web3.eth.Contract(libraryContractABI, libraryAddress);
        //Fetching address and creating instance of library contract

        const books = await librarycontract.bookTokenContract.methods.getBooks().call();
        //Fetching books from the blockchain. This function needs some work. I think something's wrong with it.

        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong while fetching book details" });
    }

    //Oh fuck this is confusing. I think the way i have made the contracts communicate is pretty absurd lmao. [FIXED]
    // so this route handles the case where we ask for all the books in a library's inventory
    // This might cause issues because I think the getBooks function returns an array of a special type of construct type and not an object
    // Should get clearer while testing
})

app.get('/api/library/:LibId/users', async (req, res) => {
    try {
        const lib_Id = req.params.LibId;

        const libraryContractAddress = await libraryContractFactory.methods.getLibrary(lib_Id).call();
        const libraryContract = new web3.eth.Contract(libraryContractABI, libraryContractAddress);

        const users = await libraryContract.userContract.methods.getUsers().call();

        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong while fetching users" })
    }

    // This route handles the case where we wanna retrieve the information we have about all the users.
})

app.get('/', (req, res) => {
    res.send("Welcome to the Librarium API");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});