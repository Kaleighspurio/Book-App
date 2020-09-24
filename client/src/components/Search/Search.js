import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Search() {

    // Handle input change functions
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Keyword"
        variant="outlined"
        fullWidth="true"
        margin="normal"
        size="small"
      />
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        fullWidth="true"
        margin="normal"
        size="small"
      />
      <TextField
        id="outlined-basic"
        label="Subject"
        variant="outlined"
        fullWidth="true"
        margin="normal"
        size="small"
      />
      <Button color="primary" fullWidth="true" variant="contained">
        Search
      </Button>
    </form>
  );
}
