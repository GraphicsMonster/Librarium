const express = require('express');
const web3 = require('web3');

const app = express();
const port = 3000;


// This file is server side, so we need to use the web3 library to connect to the blockchain
// After connecting to the blockchain we will fetch data from the blockchain and send it to the client side
// This script serves as the intermediary between the client side and the blockchain.
// Let's code!

app.get('api/books', (req, res) => {

})

app.get('api/books/:id', (req, res) => {

})

app.get('api/users', (req, res) => {

})

app.get('api/users/:id', (req, res) => {

})

app.get('api/library', (req, res) => {

})

app.get('api/library/:id', (req, res) => {

})