import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Navbar from '../../components/Navbar/Navbar';
import Grid from '@material-ui/core/Grid';
import MyBookAccordion from '../../components/MyBookAccordion/MyBookAccordion';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './MyBooks.css';

export default function MyBooks() {
  const { userId } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [unreadBooks, setUnreadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [authorArray, setAuthorArray] = useState([]);
  const [authorSearch, setAuthorSearch] = useState('');
  // Get the books that the user as saved and display them
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios.get(`api/mybooks/${userId}`).then((response) => {
      console.log(response.data);
      const unReadBooks = response.data.filter(
        (book) => book.have_read === false
      );
      const readBooks = response.data.filter((book) => book.have_read === true);
      setUnreadBooks(unReadBooks);
      setReadBooks(readBooks);
      setMyBooks(response.data);
      makeAuthorArray(response.data);
    });
  };

  const handleChange = (event) => {
    setAuthorSearch(event.target.value);
  };

  const makeAuthorArray = (data) => {
    const arrayOfAuthors = [];
    data.forEach((book) => {
      arrayOfAuthors.push(book.author1);
    });
    const uniqueAuthors = [...new Set(arrayOfAuthors)];
    console.log(uniqueAuthors);
    setAuthorArray(uniqueAuthors);
  };

  const sortByAuthor = () => {
    axios
      .get(`api/mybooks/${userId}/author/${authorSearch}`)
      .then((response) => {
        console.log(response);
        const unReadBooks = response.data.filter(
          (book) => book.have_read === false
        );
        const readBooks = response.data.filter((book) => book.have_read === true);
        setUnreadBooks(unReadBooks);
        setReadBooks(readBooks);
        setMyBooks(response.data);
      });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="mybooks-container">
        <Grid container justify="center">
          <Grid item xs={6}>
            <Typography align="center" className="heading-mybooks" variant="h2">
              My Books
            </Typography>
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">
                Author
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={authorSearch}
                onChange={handleChange}
                // variant='filled'
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {authorArray.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter your books by author</FormHelperText>
            </FormControl>
            <Button
              className="main-home-button"
              type="submit"
              color="primary"
              // fullWidth={true}
              variant="contained"
              onClick={sortByAuthor}
              onKeyDown={(event) => {
                event.preventDefault();
                if (event.keycode === 13) {
                  sortByAuthor();
                }
              }}
            >
              Filter
            </Button>
            <Button
              className="clear-button"
              type="submit"
              color="primary"
              // fullWidth={true}
              variant="contained"
              onClick={getBooks}
            >
              Refresh Books
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography
              variant="h4"
              align="center"
              className="read-unread-text"
            >
              Books I want to read...
            </Typography>
            {unreadBooks.map((book) => (
              <MyBookAccordion
                read={false}
                key={book.id}
                info={book}
                getBooks={getBooks}
                readStatus={book.have_read}
                myBooks={true}
              />
            ))}
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              variant="h4"
              align="center"
              className="read-unread-text"
            >
              Books I've read...
            </Typography>
            {readBooks.map((book) => (
              <MyBookAccordion
                read={true}
                key={book.id}
                info={book}
                getBooks={getBooks}
                readStatus={'read'}
                myBooks={true}
              />
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
