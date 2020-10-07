import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import MyBookAccordion from '../../components/MyBookAccordion/MyBookAccordion';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import './MyFavorites.css';

export default function MyFavorites() {
  const { userId } = useContext(AuthContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    getFavoriteBooks();
  }, []);

  const getFavoriteBooks = () => {
    axios.get(`api/myfavorites/${userId}`).then((response) => {
      setFavoriteBooks(response.data);
    });
  };

  const sortByAuthor = () => {
    favoriteBooks.sort()
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
      <Typography align="center" className="heading-mybooks" variant="h2">
          My Favorites
        </Typography>
        {favoriteBooks.map((book) => (
          <MyBookAccordion
            key={book.id}
            info={book}
            showRead={false}
            getFavoriteBooks={getFavoriteBooks}
          />
        ))}
      </Container>
    </>
  );
}
