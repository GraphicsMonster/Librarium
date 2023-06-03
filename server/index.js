const express = require('express');
const web3 = require('web3');

const app = express();
const port = 3000;


// This file is server side, so we need to use the web3 library to connect to the blockchain
// After connecting to the blockchain we will fetch data from the blockchain and send it to the client side
// This script serves as the intermediary between the client side and the blockchain.
// Let's code!

app.get('api/library/:id/books', (req, res) => {
    const libraryId = req.params.id;
    const librarycontractABI = ''

    //Oh fuck this is confusing. I think the way i have made the contracts communicate is pretty absurd lmao. 
})

app.get('api/library/:id/users', (req, res) => {
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