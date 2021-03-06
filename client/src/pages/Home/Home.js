import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Search from '../../components/Search/Search';
import BookCard from '../../components/BookCard/BookCard';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import './Home.css';

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
        login.password &&
        login.passwordConfirm &&
        login.password !== login.passwordConfirm
      ) {
        setAlertMessage('Your passwords do not match');
        setAlertActive(true);
      } else if (
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
            if (response.data.name === 'SequelizeUniqueConstraintError') {
              setAlertMessage('A user already exists with that email.');
              setAlertActive(true);
            } else if (response.data.name === 'SequelizeValidationError') {
              setAlertMessage('Email must be a valid email address...');
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
            setAlertMessage(
              'Something went wrong... Check that all the fields are filled in and try again.'
            );
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
      axios
        .get(`api/search/keyword/${search.keyword}/author/${search.author}`)
        .then((response) => {
          if (response.data.totalItems === 0) {
            setAlertMessage('No results for your search');
            setAlertActive(true);
          } else {
            setSearchResults(response.data.items);
            setAlertMessage();
            setAlertActive(false);
          }
        });
    } else if (search.keyword) {
      axios.get(`api/search/keyword/${search.keyword}`).then((response) => {
        if (response.data.totalItems === 0) {
          setAlertMessage('No results for your search');
          setAlertActive(true);
        } else {
          setSearchResults(response.data.items);
          setAlertMessage();
          setAlertActive(false);
        }
      });
    } else if (search.author) {
      axios.get(`api/search/author/${search.author}`).then((response) => {
        if (response.data.totalItems === 0) {
          setAlertMessage('No results for your search');
          setAlertActive(true);
        } else {
          setSearchResults(response.data.items);
          setAlertMessage();
          setAlertActive(false);
        }
      });
    } else if (!search.author && !search.keyword) {
      setAlertMessage('Oops, you need to enter something to search by!');
      setAlertActive(true);
    }
  };

  const clearResults = () => {
    setSearchResults();
  };

  return (
    <>
      <Navbar setRender={setRender} />
      <div className="home-page-container">
        {render === 'search' ? (
          <>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={10} sm={8} md={8}>
                <Typography className="welcome" variant="h2" align="center">
                  Welcome to My Bookshelf!
                </Typography>
                <Typography
                  display="block"
                  variant="body1"
                  className="home-text"
                >
                  Utilize the search below to find books!  You may use the keyword search to look up a title, part of a title, or a keyword.  You may use the Author search to type part or all of an author's name.
                  <br/>
                  <br/>
                  When your search results appear, you will be able to view the bookcover, title, and author.  By clicking {<InfoIcon fontSize='small'/>} you can view more information about that particular book.
                  <br/>
                  <br/>
                  If you sign up for My Bookshelf, you have access to the 'My Books' and 'My Favorites' features where you can track books you've read, books you haven't read but would like to read, and you all time favorite books.  New users can create an account by clicking "SIGNUP".
                </Typography>
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
            <Grid container justify="center" className="bookcard-container">
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
