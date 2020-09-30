import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import MyBookAccordion from '../../components/MyBookAccordion/MyBookAccordion';
import Container from '@material-ui/core/Container';

export default function MyFavorites() {
  const { userId } = useContext(AuthContext);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    getFavoriteBooks();
  }, []);

  const getFavoriteBooks = () => {
    axios.get(`api/myfavorites/${userId}`).then((response) => {
      console.log(response);
      setFavoriteBooks(response.data);
    });
  };

  return (
    <>
      <Navbar />
      My Favorites page
      <Container maxWidth="md">
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
