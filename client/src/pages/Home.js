import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import BookCard from '../components/BookCard/BookCard';
import Grid from '@material-ui/core/Grid';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

export default function Home() {
  const [search, setSearch] = useState({});
  const [searchResults, setSearchResults] = useState();
  const [login, setLogin] = useState();
  const [render, setRender] = useState('search');

  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = (event) => {
    if (login.email && login.password) {
      axios.post(`api/auth/login`, login).then((response) => {
        console.log(response)
      })
    } else {
      console.log("Oops, we're missing a email or password")
    }
  };

  const handleSignup = (event) => {
    if (login.email && login.password && login.passwordConfirm) {
      const signupObject = {
        firstName: login.firstName,
        lastName: login.lastName,
        email: login.email,
        password: login.password
      };
      axios.post(`api/auth/signup`, signupObject).then((response) => {
        console.log(response)
      })
    } else {
      console.log("Oops, we're missing a email or password")
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.keyword && search.author) {
      console.log('Searched both parameters');
      axios
        .get(`api/search/keyword/${search.keyword}/author/${search.author}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.totalItems === 0) {
            console.log('No results for your search');
          } else {
            setSearchResults(response.data.items);
          }
        });
    } else if (search.keyword) {
      console.log('keyword only');
      axios.get(`api/search/keyword/${search.keyword}`).then((response) => {
        console.log(response.data);
        if (response.data.totalItems === 0) {
          console.log('No results for your search');
        } else {
          setSearchResults(response.data.items);
        }
      });
    } else if (search.author) {
      console.log('Author only');
      axios.get(`api/search/author/${search.author}`).then((response) => {
        console.log(response.data);
        if (response.data.totalItems === 0) {
          console.log('No results for your search');
        } else {
          setSearchResults(response.data.items);
        }
      });
    } else if (!search.author && !search.keyword) {
      console.log('Oops, you need to enter something to search by!');
    }
    setSearch({});
  };

  return (
    <>
      <Navbar setRender={setRender} />
      <div>
        {render === 'search' ? (
          <>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={10} sm={8} md={8}>
                <p>
                  Search for books by keyword, part of a title, author, and/or
                  subject. Logged in users can add books to their page and can
                  mark them as read or unread, and add them as favorites to keep
                  track of their reading history.
                </p>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={8} sm={6} md={4}>
                <Search
                  handleSearchInputChange={handleSearchInputChange}
                  handleSearch={handleSearch}
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              {searchResults
                ? searchResults.map((book) => (
                    <BookCard key={book.id} info={book.volumeInfo} />
                  ))
                : null}
            </Grid>
          </>
        ) : render === 'login' ? (
          <Grid container justify="center">
            <Grid item xs={8} sm={6} md={4}>
              <Login
                handleLoginInputChange={handleLoginInputChange}
                handleLogin={handleLogin}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="center">
            <Grid item xs={8} sm={6} md={4}>
              <Signup
                handleLoginInputChange={handleLoginInputChange}
                handleSignup={handleSignup}
              />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
