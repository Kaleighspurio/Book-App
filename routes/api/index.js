const router = require('express').Router();
const axios = require('axios');
const db = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

// Get from Google Books by keyword
router.get('/search/keyword/:keyword', (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}&country=US&maxResults=30`,
    )
    .then((response) => {
      res.json(response.data);
    }).catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err,
      });
    });
});

// Get from Google Books by keyword and author
router.get('/search/keyword/:keyword/author/:author', (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.keyword}+inauthor:${req.params.author}&maxResults=30&country=US`,
    )
    .then((response) => {
      res.json(response.data);
    }).catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err,
      });
    });
});

// Get from Google Books by author only
router.get('/search/author/:author', (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${req.params.author}&country=US&maxResults=30`,
    )
    .then((response) => {
      res.json(response.data);
    }).catch((err) => {
      res.status(500).json({
        message: 'An error occurred',
        error: err,
      });
    });
});

// Add more googlebook routes for all possible search possiblities?
router.get('/mybooks/:id', isAuthenticated, (req, res) => {
  db.Book.findAll({
    where: { UserId: req.params.id },
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// remove a book from the user's MyBooks
router.delete('/mybooks/:UserId/book/:bookId', isAuthenticated, (req, res) => {
  db.Book.destroy({
    where: {
      UserId: req.params.UserId,
      id: req.params.bookId,
    },
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// Add a book to MyBooks
router.post('/addbook/:id', isAuthenticated, (req, res) => {
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
    },
  }).then(([book, created]) => {
    console.log(book.get({
      plain: true,
    }));
    console.log(created);
    res.json(book);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// add book to favorites
router.put('/mybooks/:userId/favorite-book/:bookid', isAuthenticated, (req, res) => {
  db.Book.update({
    is_favorite: true,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// remove book from favorites
router.put('/mybooks/:userId/favorite-book/:bookid/remove', isAuthenticated, (req, res) => {
  db.Book.update({
    is_favorite: false,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// update a book to make it read
router.put('/mybooks/:userId/read-book/:bookid', isAuthenticated, (req, res) => {
  db.Book.update({
    have_read: true,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// update book to make it unread
router.put('/mybooks/:userId/unread-book/:bookid', isAuthenticated, (req, res) => {
  db.Book.update({
    have_read: false,
  }, {
    where: {
      id: req.params.bookid,
      UserId: req.params.userId,
    },
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// get all favorites associated to a user
router.get('/myfavorites/:userId', isAuthenticated, (req, res) => {
  db.Book.findAll({
    where: {
      UserId: req.params.userId,
      is_favorite: true,
    },
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});

// get all my books of a certain author
router.get('/mybooks/:userId/author/:author', isAuthenticated, (req, res) => {
  db.Book.findAll({
    where: {
      UserId: req.params.userId,
      author1: req.params.author,
    },
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json({
      message: 'An error occurred',
      error: err,
    });
  });
});


module.exports = router;
