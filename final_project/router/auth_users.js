const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
    "username":"user12",
    "password":"pwd12"
} ];

const addUser = (username, password) => {
    users.push({ username: username, password: password });
};

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
for(const user of users) {
    if (user.username === username) return false;
} return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
for(const user of users) {
    if (user.username === username && user.password === password) return true;
} return false;
}

regd_users.get("/", (req,res) => {
    return res.send(JSON.stringify(users));
})

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Body Empty"});
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: username
          }, 'access', { expiresIn: 60 * 60 });
    
          req.session.authorization = {
            accessToken
        }
        return res.status(200).send("User successfully logged in");
    }   
  //Write your code here
  return res.send("This user is not registered");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const book = books[req.params.isbn];
  const review = req.query.review;
  const accessToken = req.session.authorization.accessToken;
  const decodedToken = jwt.verify(accessToken, 'access');
  const user = decodedToken.data;
  if (book) {
    book.reviews[user] = review;
    return res.status(200).send("review added");
  } else {
    return res.status(404).send("Book not found!")
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const book = books[req.params.isbn];
    const reviews = book.reviews;
    const accessToken = req.session.authorization.accessToken;
    const decodedToken = jwt.verify(accessToken, 'access');
    const user = decodedToken.data;
    if (book) {
      if (reviews[user]) {
        delete reviews[user];
        return res.status(200).send("review deleted");
      }
      return res.status(404).send("you have not yet made any reviews");
    } else {
      return res.status(404).send("Book not found!")
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.addUser = addUser;