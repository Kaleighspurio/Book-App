import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import Grid from '@material-ui/core/Grid';

export default function Home() {
    const [search, setSearch] = useState({});
    const [searchResults, setSearchResults] = useState();
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSearch({ ...search, [name]: value });
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
    };
  

  return (
    <>
      <Nav />
      <div>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={10} sm={8} md={8}>
            <p>
              Search for books by keyword, part of a title, author, and/or
              subject. Logged in users can add books to their page and can mark
              them as read or unread, and add them as favorites to keep track of
              their reading history.
            </p>
          </Grid>
        </Grid>
        <Grid container justify="center">
            <Grid item xs={8} sm={6} md={4}>
               <Search handleInputChange={handleInputChange} handleSearch={handleSearch} /> 
            </Grid>
          
        </Grid>
        <Grid container justify="center">
            {/* Display search results here? */}

        </Grid>
      </div>
    </>
  );
}
