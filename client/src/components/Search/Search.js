import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Search({handleInputChange, handleSearch}) {


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
