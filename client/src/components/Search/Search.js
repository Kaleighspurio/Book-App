import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Search({ handleSearchInputChange, handleSearch, clearResults }) {
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
        onChange={handleSearchInputChange}
      />
      <TextField
        id="outlined-basic"
        name="author"
        label="Author"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        size="small"
        onChange={handleSearchInputChange}
      />
      <Button
        color="primary"
        fullWidth={true}
        variant="contained"
        onClick={handleSearch}
      >
        Search
      </Button>
      <Button
        color="default"
        fullWidth={true}
        variant="contained"
        onClick={clearResults}
      >
        Clear Search Results
      </Button>
    </form>
  );
}
