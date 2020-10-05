import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import BookCard from '../components/BookCard/BookCard';
import Grid from '@material-ui/core/Grid';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

export default function Home() {
  const { setIsAuth, userId, setUserId } = useContext(AuthContext);
  const [search, setSearch] = useState({});
  const [searchResults, setSearchResults] = useState();
  const [login, setLogin] = useState();
  const [render, setRender] = useState('search');

  const [alertActive, setAlertActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [successAlertActive, setSuccessAlertActive] = useState(false);

  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    if (login === undefined) {
      setAlertMessage('Please enter your password and email');
      setAlertActive(true);
    } else {
      if (login.email && login.password) {
        axios
          .post(`api/auth/login`, login)
          .then((response) => {
            console.log(response);
            setIsAuth(true);
            setUserId(response.data.id);
            setAlertActive(false);
            setSuccessAlertActive(false);
            setAlertMessage();
            history.push('/mybooks');
          })
          .catch((err) => {
            setAlertMessage(
              'There is no user that matches the password and email given.  Please try again, or create an account.'
            );
            setAlertActive(true);
          });
      } else {
        console.log("Oops, we're missing a email or password");
        if (!login.email && !login.password) {
          setAlertMessage('Please enter your password and email');
          setAlertActive(true);
        } else if (!login.email) {
          setAlertMessage('Please enter your email address');
          setAlertActive(true);
        } else if (!login.password) {
          setAlertMessage('Please enter your password');
          setAlertActive(true);
        }
      }
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (login === undefined) {
      setAlertMessage(
        'You are missing required information.  All fields are required...'
      );
      setAlertActive(true);
    } else {
      if (
        login.firstName &&
        login.lastName &&
        login.email &&
        login.password &&
        login.passwordConfirm
      ) {
        const signupObject = {
          firstName: login.firstName,
          lastName: login.lastName,
          email: login.email,
          password: login.password,
        };
        axios
          .post(`api/auth/signup`, signupObject)
          .then((response) => {
            console.log(response);
            if (response.data.name === 'SequelizeUniqueConstraintError') {
              setAlertMessage('A user already exists with that email.')
              setAlertActive(true);
            } else {
              setRender('login');
              setAlertActive(false);
              setSuccessAlertActive(true);
              setAlertMessage(
                'You have successfully signed up.  Please Login...'
              );
            }
          })
          .catch((err) => {
            console.log(err);
            setAlertMessage('Something went wrong... Check that all the fields are filled in and try again.');
            setAlertActive(true);
          });
      } else {
        setAlertMessage(
          'You are missing a required field.  All fields are required...'
        );
        setAlertActive(true);
      }
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

  const clearResults = () => {
    setSearchResults();
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
                  clearResults={clearResults}
                  alertActive={alertActive}
                  alertMessage={alertMessage}
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
                alertActive={alertActive}
                alertMessage={alertMessage}
                successAlertActive={successAlertActive}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container justify="center">
            <Grid item xs={8} sm={6} md={4}>
              <Signup
                handleLoginInputChange={handleLoginInputChange}
                handleSignup={handleSignup}
                alertActive={alertActive}
                alertMessage={alertMessage}
              />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
