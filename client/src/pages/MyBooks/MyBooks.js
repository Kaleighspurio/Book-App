import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Navbar from '../../components/Navbar/Navbar';
import Grid from '@material-ui/core/Grid';
import MyBookAccordion from '../../components/MyBookAccordion/MyBookAccordion';
import Typography from '@material-ui/core/Typography';
import './MyBooks.css';

export default function MyBooks() {
  const { userId } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [unreadBooks, setUnreadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
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
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="mybooks-container">
        <Typography align="center" className="heading-mybooks" variant="h2">
          My Books
        </Typography>
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
