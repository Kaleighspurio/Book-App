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
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}&country=US&maxResults=30&key=${process.env.API_KEY}`
    )
    .then((response) => {
      res.json(response.data);
    });
});

// Get from Google Books by keyword and author
router.get('/search/keyword/:keyword/author/:author', (req, res) => {
  console.log(req.params);
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}+inauthor:${req.params.author}&maxResults=30&country=US&key=${process.env.API_KEY}`
    )
    .then((response) => {
      res.json(response.data);
    });
});

// Get from Google Books by author only
router.get('/search/author/:author', (req, res) => {
  console.log(req.params);
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${req.params.author}&country=US&maxResults=30&key=${process.env.API_KEY}`
    )
    .then((response) => {
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
router.get('/mybooks/:id', isAuthenticated, (req, res) => {
  db.Book.findAll({
    where: { UserId: req.params.id },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// remove a book from the user's MyBooks
router.delete('/mybooks/:UserId/book/:bookId', (req, res) => {
  db.Book.destroy({
    where: {
      UserId: req.params.UserId,
      id: req.params.bookId,
    },
  }).then((data) => {
    res.json(data);
  });
});

// Add a book to MyBooks
router.post('/addbook/:id', (req, res) => {
  console.log(req.body);
  db.Book.findOrCreate({
    where: { UserId: req.params.id, isbn: req.body.isbn },
    defaults: {
      title: req.body.title,
      subtitle: req.body.subtitle,
      author1: req.body.author1,
      author2: req.body.author2,
      author3: req.body.author3,
      author4: req.body.author4,
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
      publisher: req.body.publisher,
      publish_date: req.body.publish_date,
      page_count: req.body.page_count,
      isbn: req.body.isbn,
      categories: req.body.categories,
      average_rating: req.body.average_rating,
      have_read: false,
      is_favorite: false,
      UserId: req.params.id,
    }
  }).then(([book, created]) => {
    console.log(book.get({
      plain: true,
    }));
    console.log(created);
    res.json(book);
  });
});

// add book to favorites
router.put('/mybooks/:userId/favorite-book/:bookid', (req, res) => {
  db.Book.update({
    is_favorite: true,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

// remove book from favorites
router.put('/mybooks/:userId/favorite-book/:bookid/remove', (req, res) => {
  db.Book.update({
    is_favorite: false,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

// update a book to make it read
router.put('/mybooks/:userId/read-book/:bookid', (req, res) => {
  db.Book.update({
    have_read: true,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

// update book to make it unread
router.put('/mybooks/:userId/unread-book/:bookid', (req, res) => {
  db.Book.update({
    have_read: false,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

// get all favorites associated to a user
router.get('/myfavorites/:userId', (req, res) => {
  db.Book.findAll({
    where: {
      UserId: req.params.userId,
      is_favorite: true,
    },
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});


module.exports = router;
