const router = require('express').Router();
const axios = require('axios');
const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

// Get from Google Books by keyword
router.get('/search/keyword/:keyword', (req, res) => {
  console.log(req.params);
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}&maxResults=30&key=${process.env.API_KEY}`).then((response) => {
    res.json(response.data);
  });
});


// Get from Google Books by keyword and author
router.get('/search/keyword/:keyword/author/:author', (req, res) => {
  console.log(req.params);
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}+inauthor:${req.params.author}&maxResults=30&key=${process.env.API_KEY}`).then((response) => {
    res.json(response.data);
  });
});

// Get from Google Books by author only
router.get('/search/author/:author', (req, res) => {
  console.log(req.params);
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${req.params.author}&maxResults=30&key=${process.env.API_KEY}`).then((response) => {
    res.json(response.data);
  });
});

// // Get from google books by keyword adn subject
// router.get('/search/keyword/:keyword/subject/:subject', (req, res) => {
//   console.log(req.params);
//   axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}+suject:${req.params.subject}&maxResults=30&key=${process.env.API_KEY}`).then((response) => {
//     res.json(response.data);
//   });
// });

// Add more googlebook routes for all possible search possiblities?
router.get('/mybooks/:id', (req, res) => {
  db.Book.findAll({
    where: { UserId: req.params.id },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
