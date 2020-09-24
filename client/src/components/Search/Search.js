import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Search() {
  const [search, setSearch] = useState({});
  const [searchResults, setSearchResults] = useState();

  // Handle input change functions
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

  // handle search button click to call googlebooks api
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        name="keyword"
        label="Keyword"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        size="small"
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-basic"
        name="author"
        label="Author"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        size="small"
        onChange={handleInputChange}
      />
      {/* <TextField
        id="outlined-basic"
        name="subject"
        label="Subject"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        size="small"
        onChange={handleInputChange}
      /> */}
      <Button
        color="primary"
        fullWidth={true}
        variant="contained"
        onClick={handleSearch}
      >
        Search
      </Button>
    </form>
  );
}
