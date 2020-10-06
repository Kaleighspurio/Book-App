import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Navbar from '../../components/Navbar/Navbar';
import Grid from '@material-ui/core/Grid';
import MyBookAccordion from '../../components/MyBookAccordion/MyBookAccordion';
// import BookCard from '../../components/BookCard/BookCard';

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
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <div>Unread books</div>
            {unreadBooks.map((book) => (
              <MyBookAccordion
                key={book.id}
                info={book}
                getBooks={getBooks}
                readStatus={book.have_read}
                myBooks={true}
              />
            ))}
          </Grid>
          <Grid item md={6} xs={12}>
            <div>Read books</div>
            {readBooks.map((book) => (
              <MyBookAccordion
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
