import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

export default function MyBooks() {
    const { userId } = useContext(AuthContext);
    const [myBooks, setMyBooks] = useState([]);
    // Get the books that the user as saved and display them
    useEffect(() => {
        axios.get(`api/mybooks/${userId}`).then((response) => {
            console.log(response)
        })
    }, [])
    // reuse the Bookcard component
  return (
    <>
      <Navbar />
      <div>This is the mybooks page</div>
    </>
  );
}
