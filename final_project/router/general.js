const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let addUser = require("./auth_users.js").addUser;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username&&password) {
    if (!isValid(username)) {
        return res.status(200).send("Username already exists.");
    }
    addUser(username, password);
    return res.status(200).send("User registered.");
  } else {
    return res.status(404).send("Please enter username and password in the request body.");
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const book = books[req.params.isbn];
  if (book) {
    return res.status(200).send(JSON.stringify({book}, null, 4));
  } else {
    return res.status(404).json({message: "Book not found!"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const keys = Object.keys(books);
  const getBook = (keys) => {
    for (const k of keys) {
        if (books[k].author===author) {
            return books[k];
        }
      }
      return null;
  }
  const book = getBook(keys);
  if (book) {
    return res.status(200).send(JSON.stringify({book}, null, 4));
  } else {
    return res.status(404).json({message: "Book not found!"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const keys = Object.keys(books);
  const getBook = (keys) => {
    for (const k of keys) {
        if (books[k].title===title) {
            return books[k];
        }
      }
      return null;
  }
  const book = getBook(keys);
  if (book) {
    return res.status(200).send(JSON.stringify({book}, null, 4));
  } else {
    return res.status(404).json({message: "Book not found!"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const book = books[req.params.isbn];
  const reviews = book.reviews;
  if (book) {
    return res.status(200).send(JSON.stringify({reviews}, null, 4));
  } else {
    return res.status(404).json({message: "Book not found!"});
  }
 });

module.exports.general = public_users;
